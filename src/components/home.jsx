import React from 'react';
import meeting from '../imges/meeting.jpg';

function Home() {
  return (
    <div>
      <div className='header'></div>
      <div id='content' className='middle-container'>
        <div className='about-container'>
          <div className='img-container' data-aos='fade-right' data-aos-duration='1000'>
            <img src={meeting} alt='people' tabIndex='0' />
          </div>
          <div className='text-container' data-aos='fade-left' data-aos-duration='1000'>
            <p tabIndex='0'>
              The firm of architects Chani Ben Shimon came to Israel after it's dizzying success around the world in order to bring Israel to the forefront of architectural
              innovation that has existed for years in countries such as the United States, Dubai, Singapore, etc.
              <br />
              Our firm specializes in building luxury towers in inspiring design that create a lot of interest around them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
