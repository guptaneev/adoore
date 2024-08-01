package com.zonda;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import com.zonda.Models.MarketData;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/price-pilot")
public class PricePilotService {


    private static final Map<String, String> marketMap = loadMarketData();
    @GET
    @Path("/hello")
    @Produces("text/plain")
    public Response sayHello() {
        return Response.ok("Hello, World! Bhim").build();
    }





    @GET
    @Path("/markets")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMarkets() {
        String filePath = Paths.get("/Users/ngupta/repositories/housingpricepilot/src/main/resources/market.csv").toString();
        return Response.ok(marketMap).build();
    }




    @GET
    @Path("/market-names")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMarketNames() {
        String filePath = Paths.get("/Users/ngupta/repositories/housingpricepilot/src/main/resources/market.csv").toString();
        List<String> marketNames = new ArrayList<>(marketMap.values());
        return Response.ok(marketNames).build();
    }

    @POST
    @Path("/market-data")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMarketData(List<String> markets) {
        Map<String, MarketData> marketDataMap = new HashMap<>();
        for (String market : markets) {
            String marketId = getKeyByValue(marketMap, market);
            if (marketId != null) {
                MarketData marketData = fetchMarketData(marketId);
                if (marketData != null) {
                    marketDataMap.put(market, marketData);
                }
            }
        }
        return Response.ok(marketDataMap).build();
    }

    private MarketData fetchMarketData(String marketId) {
        String urlString = "https://api.newhomesource.com/api/v2/Search/CommunityLocations?partnerid=1&marketid=" + marketId + "&SortBy=Random&SortSecondBy=None&EndpointType=None";
        try {
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // success
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                return extractMarketData(response.toString());
            } else {
                System.err.println("GET request failed for market ID " + marketId + ": Response Code " + responseCode);
            }
        } catch (IOException e) {
            System.err.println("Error fetching data for market ID " + marketId);
            e.printStackTrace();
        }
        return null;
    }

    private MarketData extractMarketData(String json) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            Map<String, Object> map = mapper.readValue(json, new TypeReference<Map<String, Object>>() {});
            Map<String, Object> resultCounts = (Map<String, Object>) map.get("ResultCounts");
            Map<String, Object> facets = (Map<String, Object>) resultCounts.get("Facets");

            int qmiCount = (Integer) resultCounts.get("QmiCount");
            int homeCount = (Integer) resultCounts.get("HomeCount");

            String prRange = (String) facets.get("PrRange");
            String sftRange = (String) facets.get("SftRange");

            double medianPricePerSft = calculateMedianPricePerSft(prRange, sftRange);

            double poolPercentage = (int) facets.get("Pool") / (double) homeCount * 100;
            double viewsPercentage = (int) facets.get("Views") / (double) homeCount * 100;
            double waterfrontPercentage = (int) facets.get("WaterFront") / (double) homeCount * 100;
            double gatedPercentage = (int) facets.get("Gated") / (double) homeCount * 100;
            double naturePercentage = (int) facets.get("Nature") / (double) homeCount * 100;
            double parksPercentage = (int) facets.get("Parks") / (double) homeCount * 100;

            double roundedPoolPercentage = Math.round(poolPercentage * 10) / 10.0;
            double roundedViewsPercentage = Math.round(viewsPercentage * 10) / 10.0;
            double roundedWaterfrontPercentage = Math.round(waterfrontPercentage * 10) / 10.0;
            double roundedGatedPercentage = Math.round(gatedPercentage * 10) / 10.0;
            double roundedNaturePercentage = Math.round(naturePercentage * 10) / 10.0;
            double roundedParksPercentage = Math.round(parksPercentage * 10) / 10.0;

            return new MarketData(
                    Math.round(qmiCount),
                    Math.round(homeCount),
                    Math.round(medianPricePerSft),
                    roundedPoolPercentage,
                    roundedViewsPercentage,
                    roundedWaterfrontPercentage,
                    roundedGatedPercentage,
                    roundedNaturePercentage,
                    roundedParksPercentage
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private double calculateMedianPricePerSft(String prRange, String sftRange) {
        String[] prRangeSplit = prRange.split("-");
        String[] sftRangeSplit = sftRange.split("-");

        double minPrice = Double.parseDouble(prRangeSplit[0]);
        double maxPrice = Double.parseDouble(prRangeSplit[1]);

        double medianPrice = (minPrice + maxPrice) / 2;

        double minSft = Double.parseDouble(sftRangeSplit[0]);
        double maxSft = Double.parseDouble(sftRangeSplit[1]);

        double medianSft = (minSft + maxSft) / 2;

        return medianPrice / medianSft;
    }


    private static Map<String, String> loadMarketData() {
        String filePath = Paths.get("/Users/ngupta/repositories/housingpricepilot/src/main/resources/market.csv").toString();
        Map<String, String> marketMap = new HashMap<>();

        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> lines = reader.readAll();

            // Assuming the first row is the header
            for (int i = 0; i < lines.size(); i++) {
                String[] line = lines.get(i);
                if (line.length >= 5) {
                    String key = line[0];
                    String marketName = line[1];
                    String state = line[4];
                    String value = marketName + ", " + state;

                    marketMap.put(key, value);
                }
            }
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }

        return marketMap;
    }

    private String getKeyByValue(Map<String, String> map, String value) {
        for (Map.Entry<String, String> entry : map.entrySet()) {
            if (entry.getValue().equals(value)) {
                return entry.getKey();
            }
        }
        return null;
    }


}
//