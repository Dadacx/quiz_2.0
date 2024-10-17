import { useState, useEffect } from 'react';
const Fetch = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbxWaGf9FNpQaxxb2Od4_lo3BFDUGHsGWF4rtpaz9C75NvckuZAe3Q6KRfOXtlZbtFvD/exec')
      .then((res) => {
        return res.json();
      })
      .then((data2) => {
        var pytanie = []
        var odp = []
            for (let i = 1; i < data2.content.length; i++) {
            //console.log(data.content[i]);
            pytanie.push(data2.content[i][0])
            odp.push(data2.content[i][1])
          }
        setData({
            pytania: pytanie,
            odp: odp
        });
      });
  }, []);
  return data
};
export default Fetch;