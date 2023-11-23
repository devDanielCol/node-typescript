import { Schema, model } from "mongoose";

const technicalSheetSchema = new Schema({
    general: {
        model: { type: String, required: true },
        serialNumber: { type: String, required: true },
        manufacturingDate: { type: Date, required: true },
    },
    state: {
        condition: { type: String, enum: ["New", "Used"], required: true },
    },
    basicFeatures: {
        color: { type: String, required: true },
        weight: { type: Number, required: true },
        dimensions: {
            width: { type: Number, required: true },
            height: { type: Number, required: true },
            length: { type: Number, required: true },
        },
    },
    technicalSpecifications: {
        operatingSystem: { type: String, required: true },
        processor: { type: String, required: true },
        ram: { type: Number, required: true },
        internalStorage: { type: Number, required: true },
        sdCardSlot: { type: Boolean, default: false },
        display: {
            size: { type: Number, required: true },
            resolution: { type: String, required: true },
        },
        mainCamera: {
            megapixels: { type: Number, required: true },
            features: { type: String },
        },
        frontCamera: {
            megapixels: { type: Number, required: true },
            features: { type: String },
        },
        battery: { type: Number, required: true },
        connectivity: {
            mobileNetwork: { type: String, enum: ["3G", "4G", "5G"] },
            wifi: { type: Boolean, default: false },
            bluetooth: { type: Boolean, default: false },
            ports: { type: String },
            others: { type: String },
        },
    },
    security: {
        fingerprintSensor: { type: Boolean, default: false },
        facialRecognition: { type: Boolean, default: false },
    },
    networkConnectivity: {
        simType: {
            type: String,
            enum: ["Single SIM", "Dual SIM"],
            required: true,
        },
        compatibleBands: { type: String, required: true },
    },
    additionalInformation: {
        imei: { type: String, required: true },
        certifications: { type: String },
    },
    includedAccessories: [{ type: String }],
    warranty: {
        period: { type: Number, required: true },
        policy: { type: String },
    },
});

export const TechnicalSheet = model("TechnicalSheet", technicalSheetSchema);
