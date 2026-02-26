 import { Cl } from "@stacks/transactions";
import { describe, it, expect, beforeEach } from "vitest";

const accounts = simnet.getAccounts();
const alice = accounts.get("wallet_1")!;
const bob = accounts.get("wallet_2")!;

// Helper to donate
function donate(amount: number, user: string) {
  return simnet.callPublicFn(
    "donation-dapp", // replace with your contract name
    "donate",
    [Cl.uint(amount)],
    user
  );
}

// Helper to get a donor's donation
function getDonation(user: string) {
  return simnet.callReadOnlyFn(
    "donation-dapp",
    "get-donation",
    [Cl.principal(user)],
    user
  );
}

// Helper to get total donated amount
function getTotalDonated() {
  return simnet.callReadOnlyFn(
    "donation-dapp",
    "get-total-donated",
    [],
    alice
  );
}

// Helper to call dummy public functions
function callDummyFunc(index: number, user: string) {
  return simnet.callPublicFn(
    "donation-dapp",
    `dummy-func-${index}`,
    [],
    user
  );
}

// Helper to call dummy read-only functions
function callDummyRead(index: number) {
  return simnet.callReadOnlyFn(
    "donation-dapp",
    `dummy-read-${index}`,
    [],
    alice
  );
}

describe("Donation DApp Tests", () => {
  beforeEach(() => {
    // Reset simnet state if necessary
  });

  it("records donations correctly", () => {
    const { result } = donate(500, alice);
    expect(result).toBeOk("Donation recorded");

    const donation = getDonation(alice);
    expect(donation).toBeSome(Cl.tuple({ amount: Cl.uint(500) }));

    const total = getTotalDonated();
    expect(total).toBe(Cl.uint(500));
  });

  it("records multiple donations correctly", () => {
    donate(300, alice);
    donate(200, bob);

    const aliceDonation = getDonation(alice);
    const bobDonation = getDonation(bob);
    const total = getTotalDonated();

    expect(aliceDonation).toBeSome(Cl.tuple({ amount: Cl.uint(300) }));
    expect(bobDonation).toBeSome(Cl.tuple({ amount: Cl.uint(200) }));
    expect(total).toBe(Cl.uint(500));
  });

  it("dummy public functions return u0", () => {
    for (let i = 1; i <= 3; i++) {
      const res = callDummyFunc(i, alice);
      expect(res.result).toBeOk(Cl.uint(0));
    }
  });

  it("dummy read-only functions return u0", () => {
    for (let i = 1; i <= 2; i++) {
      const res = callDummyRead(i);
      expect(res).toBe(Cl.uint(0));
    }
  });
});
