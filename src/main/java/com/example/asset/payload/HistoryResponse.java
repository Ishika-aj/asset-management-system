package com.example.asset.payload;

public class HistoryResponse {
    private Long id;
    private Long assetId;
    private String assetName;
    private String category;
    private String assignedTo;
    private String action;

    public HistoryResponse(Long id, Long assetId, String assetName, String category, String assignedTo, String action) {
        this.id = id;
        this.assetId = assetId;
        this.assetName = assetName;
        this.category = category;
        this.assignedTo = assignedTo;
        this.action = action;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getAssetId() { return assetId; }
    public void setAssetId(Long assetId) { this.assetId = assetId; }

    public String getAssetName() { return assetName; }
    public void setAssetName(String assetName) { this.assetName = assetName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
}
