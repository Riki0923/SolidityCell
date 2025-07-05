import {
  PlayerAdvanced as PlayerAdvancedEvent,
  PlayerEscaped as PlayerEscapedEvent
} from "../generated/SolidityCell/SolidityCell"
import { PlayerAdvanced, PlayerEscaped } from "../generated/schema"

export function handlePlayerAdvanced(event: PlayerAdvancedEvent): void {
  let entity = new PlayerAdvanced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.toCell = event.params.toCell

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlayerEscaped(event: PlayerEscapedEvent): void {
  let entity = new PlayerEscaped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
