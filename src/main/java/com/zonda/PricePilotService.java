package com.zonda;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/price-pilot")
public class PricePilotService {

    @GET
    @Path("/hello")
    @Produces("text/plain")
    public Response sayHello() {
        return Response.ok("Hello, World! Bhim").build();
    }

    @GET
    @Path("/results")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getResults() {return Response.ok("hello").build(); }

    @GET
    @Path("/markets")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMarkets() {
        String filePath = Paths.get("/Users/ngupta/repositories/housingpricepilot/src/main/resources/market.csv").toString();
        Map<String, String> marketMap = readMarketCSV(filePath);
        return Response.ok(marketMap).build();
    }

    private Map<String, String> readMarketCSV(String filePath) {
        Map<String, String> marketMap = new HashMap<>();

        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> lines = reader.readAll();

            // Assuming the first row is the header
            for (int i = 1; i < lines.size(); i++) {
                String[] line = lines.get(i);
                if (line.length >= 3) {
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


    @GET
    @Path("/market-names")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMarketNames() {
        String filePath = Paths.get("/Users/ngupta/repositories/housingpricepilot/src/main/resources/market.csv").toString();
        List<String> marketNames = readMarketNamesCSV(filePath);
        return Response.ok(marketNames).build();
    }

    private List<String> readMarketNamesCSV(String filePath) {
        List<String> marketNames = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> lines = reader.readAll();

            // Assuming the first row is the header
            for (int i = 1; i < lines.size(); i++) {
                String[] line = lines.get(i);
                if (line.length >= 3) {
                    String marketName = line[1];
                    String state = line[4];
                    String nameWithState = marketName + ", " + state;
                    marketNames.add(nameWithState);
                }
            }
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }

        return marketNames;
    }
}
//