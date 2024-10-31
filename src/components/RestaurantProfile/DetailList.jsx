const details = [
    { label: "Teléfono", value: "+57 3226649707" },
    { label: "Ubicación", value: "Medellin" },
    { label: "Sitio Web", value: "www.saboresdelpacificp.com" },
  ];
  
  const DetailList = () => {
    return (
      <div className="flex justify-around mt-4 w-full">
        {details.map((detail, index) => (
          <div key={index} className="text-center">
            <p className="text-sm font-semibold">{detail.label}</p>
            <p className="text-gray-500">{detail.value}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default DetailList;
  