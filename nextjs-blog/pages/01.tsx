import React from 'react';


type Data = {
  message: string[];
  status: string;
};

type Props = {
  imageNums: number;
};

const HelloFetchImages: React.FC<Props> = (props) => {
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  // データ取得とステートの保持
  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://dog.ceo/api/breeds/image/random/${props.imageNums}`;
      const res = await fetch(url);
      const data: Data = await res.json();
      setImageUrls(data.message);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // 副作用フック（マウント時）
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading
        ? 'loading....'
        : imageUrls.map((x) => (
            <img key={x} src={x} style={{ width: 200, height: 200 }} />
          ))}
      <div>
        <button onClick={fetchData}>fetch</button>
        <button onClick={() => setImageUrls([])}>clear</button>
      </div>
    </div>
  );
};

export default function Index() {
  return (
    <div>
      <HelloFetchImages imageNums={20} />
    </div>
  );
}
