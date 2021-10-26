import { Pet } from "../models";
import { cloudinary } from "../lib/cloudinary";

export class PetController {
  async createPet(userId, data) {
    if (data.pictureDataURL) {
      const imagen = await cloudinary.uploader.upload(data.pictureDataURL, {
        resource_type: "image",
        discard_original_filename: true,
        width: 1000,
      });

      const dataUpdatedComplete = {
        name: data.name,
        image: imagen.secure_url,
        lastGeo_lat: 1,
        lastGeo_lon: 2,
        founded: false,
      };

      await Pet.update(dataUpdatedComplete, {
        where: {
          id: userId,
        },
      });

      return dataUpdatedComplete;
    }
  }
}
