export const getBaseUrl = (): string => {
  return (
    import.meta.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1"
  );
};

export const getOnlyBaseUrl = (): string => {
  return (
    import.meta.env.NEXT_PUBLIC_API_ONLY_BASE_URL || "http://localhost:5000"
  );
};

export const getSocketBaseUrl = (): string => {
  return import.meta.env.NEXT_PUBLIC_SOCKET_BASE_URL || "http://localhost:5001";
};
export const getCloudinaryEnv = (): {
  upload_preset: string;
  cloud_name: string;
} => {
  return {
    upload_preset: import.meta.env.CLOUDINARY_UPLOAD_PRESET || "mvfmecoi",
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME || "duyfxtcdd",
  };
};
