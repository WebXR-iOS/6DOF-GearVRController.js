```
Under Attribution-NonCommercial-ShareAlike 4.0 International License
Cwig's under MIT License
Jsyang's under GPL-3.0 License
```

# 6DOF GearVR Controller Tracking
An easy way to use GearVR for more complicated use cases such as VR game that need 6DOF tracking.

## How it works
- Camera tracks colors for position tracking.
- Gear VR controllers already have Built-in 3DOF tracking.

## What you need
- [1 or 2 Gear VR controllers](https://www.ebay.co.uk/itm/334214800959?itmmeta=01HW36E4GFDWEQ5SA0J6CZCV32&hash=item4dd0c1263f:g:KWQAAOSwrldhjQhc&itmprp=enc%3AAQAJAAAAwJxarMOiQ1adMogI1em2NoDUWDZHsq5a82NCFz06urAPSWe6peccV4DINWisLxRKw833PN7o76luxoNz%2FhfbJxQmsZ%2FbIPgresF1fqS8N%2BGljDjRcjfoNGdmhRstHGykFUvvt8Q4q2CJVdqmJBILGQ963xVl75VNm20OhA49xW8atB9v%2BPHB%2BsDqI7qgf5e25zqv3n%2B5yTlRq2ovuopXGCtSYYawCbanKt%2Bn3BX%2FgliI0%2FDS1bzasZyswmgfOqMb7g%3D%3D%7Ctkp%3ABk9SR8zIuObgYw)
- [Black electrical tape](https://www.ebay.co.uk/itm/284240018017?var=585729786292&epid=27045276993&itmmeta=01HW36K071B0SJSRNQDTHFQNVA&hash=item422e067a61:g:JHEAAOSwNaBeH1qj&itmprp=enc%3AAQAJAAAA0JaSsH6i%2BzNEluWpXJ47e2rgRQGKN%2B9GHdXobyfaA2IW5fO09CADKwvBmeMNGvhyRluWG15TJoN4ITsy6aPi2KNuWoTieq1CydoUCb5Rvfy98AK5aosZ57WPqarr8n3hPS%2FjMO%2FSDkL1fhhhw8YU1dGH14rojVuotLMCBmx%2F96B74T5QYKrWIjp9u84gJWQVUFV%2F3bet0F14nFvoCfpBtHtjIHevHRAJl7jh24XNJWMLwmNOgpQ%2FjlZjQ%2F%2BB%2FwsRdYJyplJa%2F9FWmMBHWz4IvJg%3D%7Ctkp%3ABk9SR8yDzObgYw)
- [Illuminated Shuttlecocks](https://www.amazon.co.uk/Jet-Badminton-Shuttlecocks-Birdies-4pcs/dp/B09495D7QW)
- [Scissors](https://www.amazon.co.uk/scissors/s?k=scissors)
- [110 Deg Webcam](https://www.amazon.co.uk/Smilodon-Microphone-Conferencing-Streaming-Compatible/dp/B0953KQR3N/ref=sr_1_3?crid=1FMQYH9ZB2HYH&dib=eyJ2IjoiMSJ9.v2J-TJtrey4cizQ06OawHVIrFgoeRPpFw8JTt9Zbf6vomJO_CFErj8ThnzrYkGNyxdmuRbI0xnhwjGWzGQtiOvQqsVEuBo0InfnFjKLAcaj7wE4-E-ZpBDMIiR1xmADWsr7YCun2UShGsjaxbSvvoRvseWYJbBNMK1fYxJG6fAq4JPLgKLBjjRNImuM5aKFwe-tQ_QD_jKq4eXpgEOuQZhExLTFRcvB6741EZqtuaXY.Fpkh2qrMLc3rGHQzMNtto6OVqSXuBWwk5cA_gRMP3-c&dib_tag=se&keywords=110+webcam&qid=1713800226&sprefix=110+webcam%2Caps%2C73&sr=8-3)

# Controller modifications

## Final Controllers
![](/README_assets/final_controller_1.jpg)
![](/README_assets/final_controller%202.jpg)

## Steps to reproduce
### Prepare lights
- Get 2 shuttlecocks and make sure that one is red and one is green.
- Cut the feathers off of the shuttlecocks.
- Remove the blue tape off both of the shuttlecocks.

### Tape the lights
- Cut off the tape into 3 bits width ways so you have 3 smaller bits of tape.
- Tape one on one side and the other on the oppersite side of the light.
- Finish by Wrapping the 3rd bit around the whole bottom like the blue tape was.
- Attach both loose ends of tape to both sides of the controller.
- Fill in the gaps with more tape making sure that none of it sticks to the controller so it is easy to turn on and off the light.
- Repeat for the second controller.
- You should now have 2 controllers that look simular to mine.

# Final steps
- Plug in your webcam.
- Open the webpage in a chromium-based browser.
- Your done!

# Credits
- [CrazyH](https://github.com/crazyh2) (Made this repo, added positional tracking and support for multiple controllers)
- Huge thanks to [Cwig](https://github.com/cwig) for [gearvr exploration](https://github.com/cwig/gearvr-exploration) which created the foundation for the Gear VR controller tracking.
- Thanks to [jsyang](https://github.com/jsyang) as well for creating a library that [Cwig](https://github.com/cwig) improved on.
