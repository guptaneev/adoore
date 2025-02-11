package com.zonda;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import com.zonda.Models.MarketData;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

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
        return Response.ok(marketMap).build();
    }

    @GET
    @Path("/market-names")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMarketNames() {
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

    private static Map<String, String> loadMarketData() {
        Map<String, String> marketMap = new HashMap<>();
        try (InputStream inputStream = PricePilotService.class.getResourceAsStream("/market.csv");
             InputStreamReader reader = new InputStreamReader(inputStream);
             CSVReader csvReader = new CSVReader(reader)) {
            
            List<String[]> lines = csvReader.readAll();
            for (String[] line : lines) {
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

    private MarketData fetchMarketData(String marketId) {
        String urlString = "https://api.newhomesource.com/api/v2/Search/CommunityLocations?partnerid=1&marketid=" + marketId + "&SortBy=Random&SortSecondBy=None&EndpointType=None";
        try {
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                try (Scanner scanner = new Scanner(conn.getInputStream())) {
                    scanner.useDelimiter("\\A");
                    return scanner.hasNext() ? extractMarketData(scanner.next()) : null;
                }
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

            double medianPricePerSft = calculateAvgPricePerSft(prRange, sftRange);

            return new MarketData(qmiCount, homeCount, (int) medianPricePerSft);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private double calculateAvgPricePerSft(String prRange, String sftRange) {
        String[] prRangeSplit = prRange.split("-");
        String[] sftRangeSplit = sftRange.split("-");

        double minPrice = Double.parseDouble(prRangeSplit[0]);
        double maxPrice = Double.parseDouble(prRangeSplit[1]);
        double avgPrice = (minPrice + maxPrice) / 2;

        double minSft = Double.parseDouble(sftRangeSplit[0]);
        double maxSft = Double.parseDouble(sftRangeSplit[1]);
        double avgSft = (minSft + maxSft) / 2;

        return avgPrice / avgSft;
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
