package com.zonda.Models;

public class MarketData {
    private int qmiCount;
    private int homeCount;
    private double avgPricePerSft;
    private double poolPercentage;
    private double viewsPercentage;
    private double waterfrontPercentage;
    private double gatedPercentage;
    private double naturePercentage;
    private double parksPercentage;
    private String prRange;

    public MarketData(int qmiCount, int homeCount, double avgPricePerSft, double poolPercentage, double viewsPercentage, double waterfrontPercentage, double gatedPercentage, double naturePercentage, double parksPercentage, String prRange) {
        this.qmiCount = qmiCount;
        this.homeCount = homeCount;
        this.avgPricePerSft = avgPricePerSft;
        this.poolPercentage = poolPercentage;
        this.viewsPercentage = viewsPercentage;
        this.waterfrontPercentage = waterfrontPercentage;
        this.gatedPercentage = gatedPercentage;
        this.naturePercentage = naturePercentage;
        this.parksPercentage = parksPercentage;
        this.prRange = prRange;
    }

    public int getQmiCount() {
        return qmiCount;
    }

    public void setQmiCount(int qmiCount) {
        this.qmiCount = qmiCount;
    }

    public int getHomeCount() {
        return homeCount;
    }

    public void setHomeCount(int homeCount) {
        this.homeCount = homeCount;
    }

    public double getAvgPricePerSft() {
        return avgPricePerSft;
    }

    public void setAvgPricePerSft(double avgPricePerSft) {
        this.avgPricePerSft = avgPricePerSft;
    }

    public double getPoolPercentage() {
        return poolPercentage;
    }

    public void setPoolPercentage(double poolPercentage) {
        this.poolPercentage = poolPercentage;
    }

    public double getViewsPercentage() {
        return viewsPercentage;
    }

    public void setViewsPercentage(double viewsPercentage) {
        this.viewsPercentage = viewsPercentage;
    }

    public double getWaterfrontPercentage() {
        return waterfrontPercentage;
    }

    public void setWaterfrontPercentage(double waterfrontPercentage) {
        this.waterfrontPercentage = waterfrontPercentage;
    }

    public double getGatedPercentage() {
        return gatedPercentage;
    }

    public void setGatedPercentage(double gatedPercentage) {
        this.gatedPercentage = gatedPercentage;
    }

    public double getNaturePercentage() {
        return naturePercentage;
    }

    public void setNaturePercentage(double naturePercentage) {
        this.naturePercentage = naturePercentage;
    }

    public double getParksPercentage() {
        return parksPercentage;
    }

    public void setParksPercentage(double parksPercentage) {
        this.parksPercentage = parksPercentage;
    }
    public String getPrRange() {
        return prRange;
    }

    public void setPrRange(String prRange) {
        this.prRange = prRange;
    }
}
