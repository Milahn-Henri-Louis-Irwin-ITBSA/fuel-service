import axios from 'axios';

export default class FuelApi {
  public async getGasStationsNearby(
    latitude: number,
    longitude: number,
    pradius: number
  ): Promise<any> {
    try {
      const response = await axios.post(
        process.env.HOTEL_API_URL,
        {
          includedTypes: ['gas_station'],
          maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude,
                longitude,
              },
              radius: pradius || 500,
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': process.env.HOTEL_API_KEY,
            'X-Goog-FieldMask':
              'places.location,places.formattedAddress,places.types',
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle error appropriately
      console.error('Error in API request:', error);
      throw error;
    }
  }
}
