import {
    generateMnemonic,
    getAddressPair,
    getAddressByWIF,
    entropyToMnemonic,
} from "../dist/index.js";

describe("generateMnemonic", () => {
    it("should create a random mnemonic containing 12 words", () => {
        const mnemonic = generateMnemonic();
        expect(mnemonic.split(" ").length).toBe(12);
    });
});

describe("getAddressPair", () => {
    it("should validate an address on main-net", () => {
        const network = "rvn";
        const mnemonic =
            "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
        const address = getAddressPair(network, mnemonic, 0, 1);
        expect(address.external.address).toBe(
            "RKbP9SMo2KTKWsiTrEDhTWPuaTwfuPiN8G"
        );
    });

    it("should validate an address on test-net", () => {
        const network = "rvn-test";
        const mnemonic =
            "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
        const address = getAddressPair(network, mnemonic, 0, 1);
        expect(address.external.address).toBe(
            "n1nUspcdAaDAMfx2ksZJ5cDa7UKVEGstrX"
        );
    });

    it("should validate Wallet Import Format (WIF) main-net ", () => {
        const network = "rvn";
        const mnemonic =
            "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
        const address = getAddressPair(network, mnemonic, 0, 1);

        expect(address.internal.address).toBe(
            "RLnvUoy29k3QiQgtR6PL416rSNfHTuwhyU"
        );
        expect(address.external.WIF).toBe(
            "KyWuYcev1hJ7YJZTjWx8coXNRm4jRbMEhgVVVC8vDcTaKRCMASUE"
        );
    });

    it("should validate Wallet Import Format (WIF) test-net ", () => {
        const network = "rvn-test";
        const mnemonic =
            "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
        const address = getAddressPair(network, mnemonic, 0, 1);

        expect(address.external.WIF).toBe(
            "cPchRRmzZXtPeFLHfrh8qcwaRaziJCS4gcAMBVVQh1EiehNyBtKB"
        );
    });
});

describe("getAddressByWIF", () => {
    it("should validate get public address from Wallet Import Format (WIF) main-et ", () => {
        const network = "rvn";
        const WIF = "KyWuYcev1hJ7YJZTjWx8coXNRm4jRbMEhgVVVC8vDcTaKRCMASUE";
        const addressObject = getAddressByWIF(network, WIF);

        expect(addressObject.address).toBe(
            "RKbP9SMo2KTKWsiTrEDhTWPuaTwfuPiN8G"
        );
    });
});

describe("entropyToMnemonic", () => {
    it("should turn valid bytes to mnemonic", () => {
        const hexString = "a10a95fb55808c5f15dc97ecbcd26cf0";
        const bytes = Uint8Array.from(Buffer.from(hexString, "hex"));
        const mnemonic = entropyToMnemonic(bytes);
        expect(mnemonic).toBe(
            "patient feed learn prison angle convince first napkin uncover track open theory"
        );
    });

    it("should fail turning non-valid bytes to mnemonic", () => {
        const hexString = "a10a94fb55808c5f15dc97ecbcd26cf0";
        const bytes = Uint8Array.from(Buffer.from(hexString, "hex"));
        const mnemonic = entropyToMnemonic(bytes);
        expect(mnemonic).not.toBe(
            "patient feed learn prison angle convince first napkin uncover track open theory"
        );
    });
});
