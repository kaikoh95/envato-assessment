require 'spec_helper'
require 'coffee_app'

RSpec.describe "integration" do
  let(:prices_json) {
    <<-JSON
      [
        { "drink_name": "short espresso", "prices": { "small": 3.03 } },
        { "drink_name": "latte", "prices": { "small": 3.50, "medium": 4.00, "large": 4.50 } },
        { "drink_name": "flat white", "prices": { "small": 3.50, "medium": 4.00, "large": 4.50 } },
        { "drink_name": "long black", "prices": { "small": 3.25, "medium": 3.50 } },
        { "drink_name": "mocha", "prices": { "small": 4.00, "medium": 4.50, "large": 5.00 } },
        { "drink_name": "supermochacrapucaramelcream", "prices": { "large": 5.00, "huge": 5.50, "mega": 6.00, "ultra": 7.00 } }
      ]
    JSON
  }

  let(:orders_json) {
    <<-JSON
      [
        { "user": "coach", "drink": "long black", "size": "medium" },
        { "user": "ellis", "drink": "long black", "size": "small" },
        { "user": "rochelle", "drink": "flat white", "size": "large" },
        { "user": "coach", "drink": "flat white", "size": "large" },
        { "user": "zoey", "drink": "long black", "size": "medium" },
        { "user": "zoey", "drink": "short espresso", "size": "small" }
      ]
    JSON
  }

  let(:payments_json) {
    <<-JSON
      [
        { "user": "coach", "amount": 2.50 },
        { "user": "ellis", "amount": 2.60 },
        { "user": "rochelle", "amount": 4.50 },
        { "user": "ellis", "amount": 0.65 }
      ]
    JSON
  }

  let(:expected_result_json) {
    <<-JSON
      [
        { "user": "coach",    "order_total": 8.00, "payment_total": 2.50, "balance": 5.50 },
        { "user": "ellis",    "order_total": 3.25, "payment_total": 3.25, "balance": 0.00 },
        { "user": "rochelle", "order_total": 4.50, "payment_total": 4.50, "balance": 0.00 },
        { "user": "zoey",     "order_total": 6.53, "payment_total": 0.00, "balance": 6.53 }
      ]
    JSON
  }

  describe CoffeeApp do
    subject(:result) do
      json_result = CoffeeApp.call(prices_json, orders_json, payments_json)
      JSON.load(json_result)
    end

    it "outputs JSON in expected form" do
      expect(result).to eq JSON.load(expected_result_json)
    end

    it "has a bunch of users who have ordered coffee" do
      user_names = result.map { |summary| summary["user"] }

      expect(user_names).to eq ["coach", "ellis", "rochelle", "zoey"]]
    end

    it "has order totals for each user" do
      order_totals = result.map { |summary| summary["order_total"] }

      # coach: 3.50 + 4.50 = 8.00, ellis: 3.25, rochelle: 4.50,
      # zoey: 3.50 + 3.03 = 6.53
      expect(order_totals).to eq [8.00, 3.25, 4.50, 6.53]
    end

    it "has payment totals for each user" do
      payment_totals = result.map { |summary| summary["payment_total"] }

      # coach: 2.50, ellis: 2.70 + 0.65 = 3.25, rochelle: 4.50,
      # zoey: no payments
      expect(payment_totals).to eq [2.50, 3.25, 4.50, 0.00]
    end

    it "has current balance for each user" do
      balances = result.map { |summary| summary["balance"] }

      # coach: 8.00 - 2.50 = 5.50, ellis: 3.25 - 3.25 = 0.00,
      # rochelle: 4.50 - 4.50 = 0.00, zoey: 6.53
      expect(balances).to eq [5.50, 0.00, 0.00, 6.53]
    end
  end
end
