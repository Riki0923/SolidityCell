import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  PlayerAdvanced,
  PlayerEscaped
} from "../generated/SolidityCell/SolidityCell"

export function createPlayerAdvancedEvent(
  player: Address,
  toCell: BigInt
): PlayerAdvanced {
  let playerAdvancedEvent = changetype<PlayerAdvanced>(newMockEvent())

  playerAdvancedEvent.parameters = new Array()

  playerAdvancedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  playerAdvancedEvent.parameters.push(
    new ethereum.EventParam("toCell", ethereum.Value.fromUnsignedBigInt(toCell))
  )

  return playerAdvancedEvent
}

export function createPlayerEscapedEvent(player: Address): PlayerEscaped {
  let playerEscapedEvent = changetype<PlayerEscaped>(newMockEvent())

  playerEscapedEvent.parameters = new Array()

  playerEscapedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return playerEscapedEvent
}
