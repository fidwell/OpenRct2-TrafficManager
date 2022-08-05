/// <reference path="environment.d.ts" />

export const pluginVersion = "1.0";
export const pluginName = "Traffic Manager";
export const pluginAuthors = ["fidwell"];
export const buildConfiguration: BuildConfiguration = __BUILD_CONFIGURATION__;
export const isProduction = (buildConfiguration === "production");
export const isDevelopment = (buildConfiguration === "development");
export const isUiAvailable = (typeof ui !== "undefined");
export const namespace = "TrafficManager";
