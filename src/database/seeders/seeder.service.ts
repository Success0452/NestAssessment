import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import { User } from "src/resources/users/entities/user.entity";
import { generateRandomNumber } from "src/utils/generateRandomNumber";
import { EntityManager } from "typeorm";
import {Country} from "../../resources/users/entities/country.entity";
import {City} from "../../resources/users/entities/city.entity";
import {CurrencyEnum} from "../../resources/users/types/user.enums";
@Injectable()
export class SeederService {
  constructor(private entityManager: EntityManager) {}

  async seedUser() {
    const userRepository = this.entityManager.getRepository(User);

    const accountExists = await userRepository.findOne({
      where: { id: "1" },
    });
    if (accountExists) return;
    const newAccount = userRepository.create({
      id: "1",
      email: "success@example.com",
      firstName: 'test',
      lastName: 'test',
      isEmailVerified: true,
      phone: '00000000000',
      password:
        "$argon2id$v=19$m=4096,t=3,p=1$cmY1b3dlazUyMWkwMDAwMA$H2NBgjSYYgvwuQEAm0PUzQ",
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });

    await userRepository.save(newAccount);

    console.log("Users seeded successfully");
  }

  async seedCountryCities() {
    const countryRepository = this.entityManager.getRepository(Country);
    const cityRepository = this.entityManager.getRepository(City);

    const countries = [
      {
        name: "Nigeria",
        code: "NG",
        currency: CurrencyEnum.NGN,
        region: "Africa",
      },
    ];

    const cities = [
      { country: "Nigeria", cities: ["Lagos", "Abuja", "Oyo"] },
    ];

    for (let i = 0; i < countries.length; i += 1) {
      const country = countries[i];
      const existingCountry = await countryRepository.findOne({
        where: { name: country.name },
      });
      if (!existingCountry) {
        const newCountry = countryRepository.create({
          id: `${country.code}${generateRandomNumber(7)}`,
          name: country.name,
          code: country.code,
          currency: country.currency,
          region: country.region,
          createdAt: moment().valueOf(),
          updatedAt: moment().valueOf(),
        });

        await countryRepository.insert(newCountry);

        const citiesInCountry = cities.find((c) => c.country === country.name);
        if (!citiesInCountry) {
          continue;
        }

        for (const city of citiesInCountry.cities) {
          const newCity = cityRepository.create({
            id: `${city.slice(0, 2).toUpperCase()}${generateRandomNumber(7)}`,
            name: city,
            country: newCountry,
          });
          await cityRepository.insert(newCity);
          if (!newCountry.cities) {
            newCountry.cities = [];
          }
          newCountry.cities.push(newCity);
          await countryRepository.save(newCountry);
        }
        console.log("Countries seeded successfully");
      }
    }
  }

  async seedData() {
    await this.seedUser();
    await this.seedCountryCities();
  }
}
