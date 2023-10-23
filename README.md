<p align="center">
  <img src="public/icon.png" alt="Website blocker logo" width="100px" height="100px" />
</p>

# Website Blocker Google Chrome extension

Extension **Version: 0.0.3**

- Only check domain
- Removed whole url checking
- Improve Performance

#

Extension **Version: 0.0.4**

- Fixed URL checking options
- Changes Options page UI
- Updated Blocking page UI

#

## IMPORTANT NOTE

Before run `build` command make sure you change few line of code from
`manifest.json`

1. Open `manifest.json` file
2. Update `action`
   ```json
   {
     "action": {
       "default_title": "Website Blocker",
       "default_icon": {
         "16": "icon.png",
         "24": "icon.png",
         "32": "icon.png"
       },
       "default_popup": "index.html"
     }
   }
   ```
   - Remember you added `default_popup` as our `index.html` which in our root.
3. Once build complate then open dist folder from root directory
4. Open `manifest..json` file
5. Now removed `"default_popup": "index.html"` this line from `action`

```json
{
  "action": {
    "default_title": "Website Blocker",
    "default_icon": {
      "16": "icon.png",
      "24": "icon.png",
      "32": "icon.png"
    }
  }
}
```

6. Finished. Now you can make `zip` to use...

## [Download Extension for Chrome](./extension-chrome/dist.zip)
