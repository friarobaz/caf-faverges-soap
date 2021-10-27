<script>
    import { metatags } from '@roxi/routify'
    
    metatags.title = 'My Routify app'
    metatags.description = 'Description coming soon...'

const password = "bazinga"

const getUser = async () => {
  const response = await fetch(
    `/.netlify/functions/get-user?password=${password}&id=742120190080`
  )
  const data = await response.json()
  const user = data.user
  console.log(user)
}

getUser()
console.log('test')

</script>

<h1>Routify Starter Template</h1>

<p>
    To see an example app that shows off a lot of Routify's features, go to <a href="/example">/example</a>
</p>

<p>
    This template is ready to be used in production! just delete the example app at: src/pages/example
</p>