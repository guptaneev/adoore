package com.zonda;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/rws")
public class PricePilotApplication extends Application {
    private Set<Class> classes = new HashSet<Class>();

    public PricePilotApplication() {
        classes.add(PricePilotService.class);
    }

    @Override
    public Set<Class<?>> getClasses() {
        return super.getClasses();
    }
}

//