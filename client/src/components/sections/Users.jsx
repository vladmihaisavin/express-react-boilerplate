import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ContentResource from '../structure/ContentResource.jsx'
import { useLoadResource } from '../../services/loadResourceHook'
import { resourceName, resourceUrl, listProperties } from '../../static/userResource.json'
import { deleteResource } from '../../services/users'

function Users() {
  const [shouldLoad, setShouldLoad] = useState(true)
  const [data, loading] = useLoadResource(resourceUrl, shouldLoad)
  const [preloader, setPreloader] = useState(true)
  const [resources, setResources] = useState([])

  const actions = {
    reload: () => setShouldLoad(true),
    delete: async (selectedIds) => {
      setPreloader(true)
      for (const resourceId of selectedIds) {
        await deleteResource(resourceId)
      }
      setShouldLoad(true)
    },
    search: (term, field) => {
      setResources(data.filter((item) => item[field].split(term).length > 1))
    }
  }

  useEffect(() => {
    setResources(data)
  }, [data])

  useEffect(() => {
    setPreloader(loading)
  }, [loading])
  
  useEffect(() => {
    setShouldLoad(false)
  }, [shouldLoad])

  return (
    <ContentResource customProps={{ actions, listProperties, resourceName, resourceUrl }} resources={resources} preloader={preloader} />
  )
}

export default withRouter(Users)