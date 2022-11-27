export type Feed = {
  device_id: string;
  s_t0: number;
  s_h0: number;
  s_d0: number;
  gps_lat: number;
  gps_lon: number;
  timestamp: string;
};

export type Project = {
  source: string;
  version: string;
  num_of_records: number;
  descriptions: {
    URL: string;
  };
  feeds: Feed[];
};
