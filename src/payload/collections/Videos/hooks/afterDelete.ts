import type { CollectionAfterDeleteHook } from 'payload'
import mux from '@/lib/mux'

const afterDeleteMuxVideoHook: CollectionAfterDeleteHook = ({ id, doc }) => {
  return async () => {
    const { assetId } = doc
    if (doc.source === 'youtube' || doc.source === 'loom') {
      return
    }
    try {
      // Check if the asset still exists in Mux. If it was deleted there first, we don't need to do anything
      console.log(`[payload-mux] Checking if asset ${assetId} exists in Mux...`)
      const video = await mux.video.assets.retrieve(assetId)

      if (video) {
        console.log(`[payload-mux] Asset ${id} exists in Mux, deleting...`)
        const response = await mux.video.assets.delete(assetId)
      }
    } catch (err: any) {
      if (err.type === 'not_found') {
        console.log(`[payload-mux] Asset ${id} not found in Mux, continuing...`)
      } else {
        console.error(`[payload-mux] Error deleting asset ${id} from Mux...`)
        console.error(err)
        throw err
      }
    }
  }
}

export default afterDeleteMuxVideoHook
