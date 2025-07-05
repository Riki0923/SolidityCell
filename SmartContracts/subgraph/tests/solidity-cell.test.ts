import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { PlayerAdvanced } from "../generated/schema"
import { PlayerAdvanced as PlayerAdvancedEvent } from "../generated/SolidityCell/SolidityCell"
import { handlePlayerAdvanced } from "../src/solidity-cell"
import { createPlayerAdvancedEvent } from "./solidity-cell-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let player = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let toCell = BigInt.fromI32(234)
    let newPlayerAdvancedEvent = createPlayerAdvancedEvent(player, toCell)
    handlePlayerAdvanced(newPlayerAdvancedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("PlayerAdvanced created and stored", () => {
    assert.entityCount("PlayerAdvanced", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PlayerAdvanced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "player",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "PlayerAdvanced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "toCell",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
