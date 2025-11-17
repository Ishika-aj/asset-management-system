package com.example.asset.service;

import com.example.asset.dto.AssetResponse;
import com.example.asset.model.Asset;
import com.example.asset.repository.AssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    // ✅ Create a new asset
    public Asset createAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    // ✅ Get all assets
    public List<AssetResponse> getAllAssets() {
        return assetRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ✅ Convert Asset → AssetResponse
    private AssetResponse convertToResponse(Asset asset) {
        return new AssetResponse(
                asset.getId(),
                asset.getName(),
                asset.getCategory(),
                asset.getStatus(),
                asset.isAssigned(),
                asset.getAssignedTo()
        );
    }
}
