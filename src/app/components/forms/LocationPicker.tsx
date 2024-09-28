import React, { useState, useEffect } from "react";
import { LOCATION_MAP } from "../../config/locationConfig";
import { twMerge } from "tailwind-merge";

interface LocationSelectorProps {
  onLocationChange: (
    region: string | null,
    province: string | null,
    city: string | null,
    barangay: string | null
  ) => void;
  initialRegion?: string | null;
  initialProvince?: string | null;
  initialCity?: string | null;
  initialBarangay?: string | null;
  className?: string;
}

const LocationPicker = ({
  onLocationChange,
  initialRegion = null,
  initialProvince = null,
  initialCity = null,
  initialBarangay = null,
  className,
}: LocationSelectorProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    initialRegion
  );
  const [selectedProvince, setSelectedProvince] = useState<string | null>(
    initialProvince
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(initialCity);
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(
    initialBarangay
  );

  const regions = Object.keys(LOCATION_MAP) as string[];
  const provinces = selectedRegion
    ? Object.keys(LOCATION_MAP[selectedRegion]?.Provinces || {})
    : [];
  const municipalities = selectedProvince
    ? Object.keys(
        LOCATION_MAP[selectedRegion!]?.Provinces[selectedProvince]
          ?.Municipalities || {}
      ).sort((a, b) => a.localeCompare(b))
    : [];

  const barangays = selectedCity
    ? (
        LOCATION_MAP[selectedRegion!]?.Provinces[selectedProvince!]
          ?.Municipalities[selectedCity]?.Barangays || []
      ).sort((a, b) => a.localeCompare(b))
    : [];

  useEffect(() => {
    setSelectedRegion(initialRegion);
    setSelectedProvince(initialProvince);
    setSelectedCity(initialCity);
    setSelectedBarangay(initialBarangay);
  }, [initialRegion, initialProvince, initialCity, initialBarangay]);

  useEffect(() => {
    onLocationChange(
      selectedRegion,
      selectedProvince,
      selectedCity,
      selectedBarangay
    );
  }, [selectedRegion, selectedProvince, selectedCity, selectedBarangay]);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region = event.target.value;
    setSelectedRegion(region || null);
    setSelectedProvince(null);
    setSelectedCity(null);
    setSelectedBarangay(null);
    onLocationChange(region || null, null, null, null);
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const province = event.target.value;
    setSelectedProvince(province || null);
    setSelectedCity(null);
    setSelectedBarangay(null);
    onLocationChange(selectedRegion, province || null, null, null);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const City = event.target.value;
    setSelectedCity(City || null);
    setSelectedBarangay(null);
    onLocationChange(selectedRegion, selectedProvince, City || null, null);
  };

  const handleBarangayChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedBarangay(event.target.value || null);
    onLocationChange(
      selectedRegion,
      selectedProvince,
      selectedCity,
      event.target.value || null
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <select
        id="region"
        value={selectedRegion ?? ""}
        onChange={handleRegionChange}
        className={twMerge(
          "w-full rounded-lg border-0 px-3 py-2 focus:outline-none focus:ring focus:ring-primary",
          className
        )}
      >
        <option value="" disabled hidden>
          Select Region
        </option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select
        id="province"
        value={selectedProvince ?? ""}
        onChange={handleProvinceChange}
        className={twMerge(
          "w-full rounded-lg border-0 px-3 py-2 focus:outline-none focus:ring focus:ring-primary",
          className
        )}
      >
        <option value="" disabled hidden>
          Select Province
        </option>
        {provinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>

      <select
        id="city"
        value={selectedCity ?? ""}
        onChange={handleCityChange}
        className={twMerge(
          "w-full rounded-lg border-0 px-3 py-2 focus:outline-none focus:ring focus:ring-primary",
          className
        )}
      >
        <option value="" disabled hidden>
          Select City/City
        </option>
        {municipalities.map((City) => (
          <option key={City} value={City}>
            {City}
          </option>
        ))}
      </select>

      <select
        id="barangay"
        value={selectedBarangay ?? ""}
        onChange={handleBarangayChange}
        className={twMerge(
          "w-full rounded-lg border-0 px-3 py-2 focus:outline-none focus:ring focus:ring-primary",
          className
        )}
      >
        <option className="text-neutral" value="" disabled hidden>
          Select Barangay
        </option>
        {barangays.map((barangay) => (
          <option key={barangay} value={barangay}>
            {barangay}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationPicker;
