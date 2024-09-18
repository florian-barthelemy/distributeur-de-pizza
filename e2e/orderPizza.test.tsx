import { by, element, expect, device } from "detox";

describe("Pizza Order Flow", () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  },300000);


it("should navigate through the pizza selection and finalize the order", async () => {
    await expect(element(by.id("Margherita"))).toBeVisible();
    await element(by.id("Margherita")).tap();

    await expect(element(by.text('Margherita'))).toBeVisible();
    await expect(element(by.text('Prix: 8.50€'))).toBeVisible();
    await element(by.id("Ajouter au panier")).tap();
    await element(by.id('cart')).tap();

    await expect(element(by.text('Total : 8.50 €'))).toBeVisible();
    await expect(element(by.id('commander'))).toBeVisible();
    await element(by.id('commander')).tap();

    await expect(element(by.text('Commande passée'))).toBeVisible();
});
});