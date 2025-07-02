export interface IOllamaServer {
  host: string;
  port: number;
  location: string;
  runner: string;
  models: IOllamaModelsInfo[] | null;
}

export interface IOllamaModelsInfo {
  name: string;
  size: number;
  model: string;
  digest: string;
  details: {
    family: string;
    format: string;
    families: string[];
    parent_model: string;
    parameter_size: string;
    quantization_level: string;
  };
  modified_at: string; // ISO 8601 timestamp
}
