import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MyTable from './MyTable';
import NavBar from './NavBar';
import { generateNUsers } from '../userGenerator/userGenerator';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useCallback } from 'react';

const Main = () => {
  const [users, setUsers] = useState([]);
  const [seed, setSeed] = useState(1);
  const [locale, setLocale] = useState('ru');
  const [errorsProbability, setErrorsProbability] = useState(0);
  const [tableSize, setTableSize] = useState(20);

  useEffect(() => {
    setUsers(generateNUsers(locale, seed, tableSize, errorsProbability));
  }, [seed, locale, errorsProbability, tableSize]);

  useBottomScrollListener(
    () => {
      setTableSize((tableSize) => tableSize + 10);
    },
    0,
    200,
    undefined,
    true
  );

  const handleScroll = (e) => {
    console.log(e);
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log('bottom');
    }
  };

  const handleCSVExport = () => {
    const csv = users
      .map((row) =>
        Object.values(row)
          .map(String)
          .map((v) => v.replaceAll('"', '""'))
          .map((v) => v.replaceAll(',', ','))
          .map((v) => `"${v}"`)
          .join(',')
      )
      .join('\r\n');
    downloadBlob(csv, 'export.csv', 'text/csv;charset=utf-8;');
  };

  function downloadBlob(content, filename, contentType) {
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  }

  return (
    <>
      <NavBar
        setSeed={setSeed}
        seed={seed}
        setLocale={setLocale}
        errorsProbability={errorsProbability}
        setErrorsProbability={setErrorsProbability}
        handleCSVExport={handleCSVExport}
      />
      <Container className="mt-4" onScroll={handleScroll}>
        <MyTable users={users} />
      </Container>
    </>
  );
};

export default Main;
