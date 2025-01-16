import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730284308315 implements MigrationInterface {
    name = 'Migrations1730284308315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('deposit', 'withdrawal', 'transfer')`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_status_enum" AS ENUM('success', 'failed', 'pending')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "amount" numeric(10,2) NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "description" character varying, "paystackReference" character varying, "status" "public"."transaction_status_enum" NOT NULL, "recipientName" character varying, "recipientAccountNumber" character varying, "recipientBankName" character varying, "walletId" character varying, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "virtual_account" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "bankName" character varying NOT NULL, "bankId" integer NOT NULL, "bankSlug" character varying NOT NULL, "accountName" character varying NOT NULL, "accountNumber" character varying NOT NULL, "currency" character varying NOT NULL, CONSTRAINT "PK_99fe832b729025bba1ec2431d56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_accounts" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "bankSwiftCode" character varying, "bankName" character varying NOT NULL, "accountNumber" character varying NOT NULL, "accountName" character varying NOT NULL, "walletId" character varying, CONSTRAINT "PK_c872de764f2038224a013ff25ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "credit_card" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "nameOnCard" character varying NOT NULL, "cardNumber" character varying NOT NULL, "expiryMonth" integer NOT NULL, "expiryYear" integer NOT NULL, "cvv" character varying NOT NULL, "walletId" character varying, CONSTRAINT "PK_97c08b6c8d5c1df81bf1a96c43e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."media_format_enum" AS ENUM('jpg', 'png', 'gif', 'mp4', 'pdf', 'docx', 'mp3', 'wav', 'mov')`);
        await queryRunner.query(`CREATE TYPE "public"."media_type_enum" AS ENUM('image', 'video', 'audio', 'document')`);
        await queryRunner.query(`CREATE TABLE "media" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "url" character varying NOT NULL, "title" character varying, "description" character varying, "format" "public"."media_format_enum" NOT NULL DEFAULT 'jpg', "type" "public"."media_type_enum" NOT NULL, "propertyId" character varying, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."country_currency_enum" AS ENUM('AED', 'AFN', 'ALL', 'AMD', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL')`);
        await queryRunner.query(`CREATE TABLE "country" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "currency" "public"."country_currency_enum" NOT NULL, "region" character varying, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "name" character varying NOT NULL, "countryId" character varying, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "property_locations" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "address" character varying, "nearestLandmark" character varying, "streetName" character varying, "propertyNumber" integer, "propertyId" character varying, "cityId" character varying, CONSTRAINT "PK_c6a83386c8131c2e4dcdcbb8305" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."properties_type_enum" AS ENUM('apartment', 'house', 'shared')`);
        await queryRunner.query(`CREATE TYPE "public"."properties_status_enum" AS ENUM('available', 'pending', 'taken')`);
        await queryRunner.query(`CREATE TABLE "properties" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "type" "public"."properties_type_enum" NOT NULL DEFAULT 'apartment', "title" character varying NOT NULL, "description" text NOT NULL, "coordinates" jsonb, "details" jsonb NOT NULL, "pricing" jsonb NOT NULL, "availability" jsonb NOT NULL, "images" text NOT NULL, "videos" text NOT NULL, "virtualTourUrl" character varying, "status" "public"."properties_status_enum" NOT NULL DEFAULT 'available', "aiMatchScore" double precision NOT NULL DEFAULT '0', "ownerId" character varying, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "content" text NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "propertyId" character varying, "senderId" character varying, "receiverId" character varying, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('house_seeker', 'departing_tenant', 'landlord', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."users_verificationlevel_enum" AS ENUM('basic', 'verified', 'premium')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'house_seeker', "verificationLevel" "public"."users_verificationlevel_enum" NOT NULL DEFAULT 'basic', "isPhoneVerified" boolean NOT NULL DEFAULT false, "isEmailVerified" boolean NOT NULL DEFAULT false, "isSuspended" boolean NOT NULL DEFAULT false, "profilePicture" character varying, "googleId" character varying, "isGoogleAccount" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."wallet_status_enum" AS ENUM('active', 'suspended', 'closed')`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "status" "public"."wallet_status_enum" NOT NULL DEFAULT 'active', "balance" numeric(10,2) NOT NULL DEFAULT '0', "paystackCustomerId" character varying, "userId" character varying, CONSTRAINT "REL_35472b1fe48b6330cd34970956" UNIQUE ("userId"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."verification_level_enum" AS ENUM('basic', 'verified', 'premium')`);
        await queryRunner.query(`CREATE TYPE "public"."verifications_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "verifications" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "documents" jsonb NOT NULL, "requestedLevel" "public"."verification_level_enum" NOT NULL DEFAULT 'basic', "status" "public"."verifications_status_enum" NOT NULL DEFAULT 'pending', "userId" character varying, CONSTRAINT "PK_2127ad1b143cf012280390b01d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "code" integer NOT NULL, "expiresOn" bigint NOT NULL, "userId" character varying, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saved_searches" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "criteria" jsonb NOT NULL, "notificationsEnabled" boolean NOT NULL DEFAULT true, "userId" character varying, CONSTRAINT "PK_d9a53c71ccc5cf66dcdc5b33dfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "intelligence" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "priceAnalysis" jsonb NOT NULL, "locationInsights" jsonb NOT NULL, "demandMetrics" jsonb NOT NULL, "propertyId" character varying, CONSTRAINT "PK_22e53c507048f80db65ab155b2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_sessions" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "aiContext" jsonb NOT NULL, "conversationHistory" text array NOT NULL, "userId" character varying, CONSTRAINT "PK_efc151a4aafa9a28b73dedc485f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_900eb6b5efaecf57343e4c0e79d" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" ADD CONSTRAINT "FK_bcf42c4a3cb52b3c48c217dfec1" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "credit_card" ADD CONSTRAINT "FK_70d8e647b174e986f36fc363a3b" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_002dc9026d4ae43dea33ab15e13" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "property_locations" ADD CONSTRAINT "FK_2f0ee112725b1c4fc5eab806bc4" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "property_locations" ADD CONSTRAINT "FK_a5099ad684b6711ab45a77f296e" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_47b8bfd9c3165b8a53cd0c58df0" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "verifications" ADD CONSTRAINT "FK_e6a542673f9abc1f67e5f32abaf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "saved_searches" ADD CONSTRAINT "FK_507a6228007bed5e89b3a291574" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "intelligence" ADD CONSTRAINT "FK_6ac020736a543639ba3a5b81adb" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_sessions" ADD CONSTRAINT "FK_d0320df1059d8a029a460f4161d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_sessions" DROP CONSTRAINT "FK_d0320df1059d8a029a460f4161d"`);
        await queryRunner.query(`ALTER TABLE "intelligence" DROP CONSTRAINT "FK_6ac020736a543639ba3a5b81adb"`);
        await queryRunner.query(`ALTER TABLE "saved_searches" DROP CONSTRAINT "FK_507a6228007bed5e89b3a291574"`);
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_db724db1bc3d94ad5ba38518433"`);
        await queryRunner.query(`ALTER TABLE "verifications" DROP CONSTRAINT "FK_e6a542673f9abc1f67e5f32abaf"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_47b8bfd9c3165b8a53cd0c58df0"`);
        await queryRunner.query(`ALTER TABLE "property_locations" DROP CONSTRAINT "FK_a5099ad684b6711ab45a77f296e"`);
        await queryRunner.query(`ALTER TABLE "property_locations" DROP CONSTRAINT "FK_2f0ee112725b1c4fc5eab806bc4"`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_002dc9026d4ae43dea33ab15e13"`);
        await queryRunner.query(`ALTER TABLE "credit_card" DROP CONSTRAINT "FK_70d8e647b174e986f36fc363a3b"`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" DROP CONSTRAINT "FK_bcf42c4a3cb52b3c48c217dfec1"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_900eb6b5efaecf57343e4c0e79d"`);
        await queryRunner.query(`DROP TABLE "chat_sessions"`);
        await queryRunner.query(`DROP TABLE "intelligence"`);
        await queryRunner.query(`DROP TABLE "saved_searches"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "verifications"`);
        await queryRunner.query(`DROP TYPE "public"."verifications_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."verification_level_enum"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TYPE "public"."wallet_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_verificationlevel_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "properties"`);
        await queryRunner.query(`DROP TYPE "public"."properties_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."properties_type_enum"`);
        await queryRunner.query(`DROP TABLE "property_locations"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TYPE "public"."country_currency_enum"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP TYPE "public"."media_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."media_format_enum"`);
        await queryRunner.query(`DROP TABLE "credit_card"`);
        await queryRunner.query(`DROP TABLE "bank_accounts"`);
        await queryRunner.query(`DROP TABLE "virtual_account"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
    }

}
