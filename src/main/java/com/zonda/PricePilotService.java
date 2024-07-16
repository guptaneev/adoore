package com.zonda;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

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
}
//