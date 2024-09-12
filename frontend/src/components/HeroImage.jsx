import React from 'react'

const HeroImage = () => {
  return (
    <>
      <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/9433163/pexels-photo-9433163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
    </>
  )
}

export default HeroImage
