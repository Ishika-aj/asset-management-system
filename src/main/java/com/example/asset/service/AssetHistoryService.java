package com.example.asset.service;

import com.example.asset.dto.AssetHistoryResponse;
import com.example.asset.model.Asset;
import com.example.asset.model.AssetHistory;
import com.example.asset.repository.AssetHistoryRepository;
import com.example.asset.repository.AssetRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssetHistoryService {

    private final AssetHistoryRepository assetHistoryRepository;
    private final AssetRepository assetRepository;

    public AssetHistoryService(AssetHistoryRepository assetHistoryRepository, AssetRepository assetRepository) {
        this.assetHistoryRepository = assetHistoryRepository;
        this.assetRepository = assetRepository;
    }

    // Add history entry
    public AssetHistory addHistory(Long assetId, String action, String assignedTo) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        AssetHistory history = new AssetHistory();
        history.setAsset(asset);
        history.setAction(action);
        history.setAssignedTo(assignedTo);
        history.setTimestamp(LocalDateTime.now());

        return assetHistoryRepository.save(history);
    }

    // Get all history as DTOs
    public List<AssetHistoryResponse> getAllHistory() {
        return assetHistoryRepository.findAll().stream()
                .map(h -> new AssetHistoryResponse(
                        h.getId(),
                        h.getAction(),
                        h.getAsset().getName(),      // safe access
                        h.getAsset().getCategory(),  // safe access
                        h.getAssignedTo(),
                        h.getTimestamp()
                ))
                .toList();
    }
}
