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

      const dataComplete = {
        name: data.name,
        image: imagen.secure_url,
        lastGeo_lat: data.lastGeo_lat,
        lastGeo_lon: data.lastGeo_lon,
        founded: false,
        userId: userId,
      };

      const newPet = await Pet.create(dataComplete);

      return { data: dataComplete, petId: newPet.get("id") };
    }
  }
  async updatePet(petId, data) {
    if (data.pictureDataURL) {
      const imagen = await cloudinary.uploader.upload(data.pictureDataURL, {
        resource_type: "image",
        discard_original_filename: true,
        width: 1000,
      });

      data.image = imagen.secure_url;
    }

    await Pet.update(data, { where: { id: petId } });

    return { data: data };
  }
}
