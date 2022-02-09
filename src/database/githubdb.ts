import DbObject from "./DbObject"
import {Octokit} from "octokit"
import AppConfig from "../.appconfig"
import Collection, {CollectionName} from "./Collection"

const octokit = new Octokit({auth: AppConfig.GITHUB_ACCESS_TOKEN})

const repoRequest = (
  method: string,
  endpoint: string,
  data?: Record<string, unknown>
) => octokit.request(`${method} /repos/rohankan/myworldtree/${endpoint}`, data)

export default {
  dbObjects: {
    commit: async (object: DbObject) => {
      const asdf = await repoRequest('PUT', 'contents/objects/testser.txt', {
        message: '[UPDATE-OBJECT] ${name}',
        content: btoa('content'),
      })
      console.log(asdf)
    }
  },
  collections: {
    commit: async <T>({name, items}: Collection<T>) => {
      const asdf = await repoRequest('PUT', `contents/collections/${name}.json`, {
        message: `[UPDATE-COLLECTION] ${name}`,
        content: btoa(JSON.stringify({name, items})),
      })
    },
    read: async (name: CollectionName) => {
      const data = await repoRequest('GET', `contents/collections/${name}.json`)
      console.log(data)
    },
  },
}
