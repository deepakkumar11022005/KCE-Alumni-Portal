import React, { useEffect, useState } from "react";
import { CustomNavbar,FilterPage,Footer } from "../../components";
 
const Filter = () => {

  return (
    <div className="">
      <CustomNavbar/>
      <FilterPage   />
      <Footer />
    </div>
  );
};

export default Filter;
