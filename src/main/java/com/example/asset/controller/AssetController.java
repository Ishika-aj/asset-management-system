package com.example.asset.controller;

import com.example.asset.dto.AssetResponse;
import com.example.asset.model.Asset;
import com.example.asset.service.AssetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:5173")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    // ✅ Add new asset
    @PostMapping
    public Asset createAsset(@RequestBody Asset asset) {
        return assetService.createAsset(asset);
    }

    // ✅ Get all assets
    @GetMapping
    public List<AssetResponse> getAllAssets() {
        return assetService.getAllAssets();
    }
}
