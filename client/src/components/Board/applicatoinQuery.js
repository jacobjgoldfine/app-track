import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_ALL_APPLICATIONS } from "../utils/mutations";
// import { QUERY_SINGLE_APPLICATION } from "../utils/queries";
import Card from "react-trello";
import Board from "./index";

export default applicationInfo = () => {
  //will query all applications
  const { data } = useQuery(QUERY_ALL_APPLICATIONS, {
    variables: { _id: id },
  });

  const [appData, setAppData] = useState(Board);

  return (
    <div>
      <div className="album py-5" id="examples">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {data.applications.map((prop) => (
              <Card key={prop.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
