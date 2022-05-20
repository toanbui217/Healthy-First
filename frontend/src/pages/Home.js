import React, { useEffect, useRef, useState } from "react";
import foodfacility from "../data/foodfacility";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Tooltip from "@mui/material/Tooltip";
import Filter from "../components/Filter";
import "./Home.css";

const maxWord = 3;
const rowPerPage = 10;
const table_header = [
  "Tên cơ sở",
  "Địa chỉ",
  "Số điện thoại",
  "Các loại hình kinh doanh",
  "Số cấp Giấy chứng nhận",
];

function Home() {
  const [openFilter, setOpenFilter] = useState(true);

  const [criteria, setCriteria] = useState({
    businessType: undefined,
  });

  const [facilityList, setFacilityList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 0,
  });
  const [filter, setFilter] = useState({
    page: 1,
    limit: rowPerPage,
    search: "",
  });

  const typingTimeout = useRef(null);

  useEffect(() => {
    var { page, limit, search } = filter;
    search = search.trim().toLowerCase();

    var tmpList;
    if (search == "") {
      tmpList = foodfacility;
    } else {
      tmpList = [
        ...foodfacility.filter(
          (item) => item.fullname.toLowerCase().indexOf(search) == 0
        ),
        ...foodfacility.filter(
          (item) => item.fullname.toLowerCase().indexOf(search) > 0
        ),
      ];
    }

    setFacilityList(tmpList.slice((page - 1) * limit, page * limit));
    setPagination({
      currentPage: page,
      totalPage: Math.ceil(tmpList.length / limit),
    });
  }, [filter]);

  const handleSearch = (e) => {
    var value = e.target.value;
    setSearchInput(value);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setFilter((filter) => {
        return { ...filter, page: 1, search: value };
      });
    }, 200);
  };

  const handleOpenFilter = () => setOpenFilter((openFilter) => !openFilter);

  const handlePagination = (e, num) =>
    setFilter((filter) => {
      return { ...filter, page: num };
    });

  const changeCriteriaFilter = (value, criterion) => {
    var tmp = criteria;
    tmp[criterion] = value;
    setCriteria(tmp);
  };

  const handleSubmitFilter = () => {
    console.log(criteria);
  };

  return (
    <div className="home">
      <div
        className={`home__filter__table ${
          openFilter ? "home__filter__table--active" : ""
        }`}
      >
        <div>
          <h2>Filter</h2>
        </div>
        <div>
          <Filter
            title={"Các loại hình kinh doanh"}
            choices={["Sản xuất thực phẩm", "Dịch vụ ăn uống"]}
            onChange={changeCriteriaFilter}
            criteria={criteria}
            filter={"businessType"}
          />

          <div className={"home__submit__filter__wrapper"}>
            <Button
              className="home__submit__filter"
              onClick={handleSubmitFilter}
            >
              <CheckCircleRoundedIcon />
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`home__content ${
          openFilter ? "home__content--collapse" : ""
        }`}
      >
        <div className="home__header">
          <div>
            <h2>Facility</h2>
          </div>

          <div className="home__widget">
            <div className="home__widget--left">
              <div className="home__search">
                <SearchRoundedIcon />
                <input
                  type="text"
                  className="home__search__input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={handleSearch}
                />
              </div>
              <Button className="home__filter" onClick={handleOpenFilter}>
                <FilterListRoundedIcon />
                Filter
              </Button>
            </div>
            <Button className="home__add">
              <AddBusinessRoundedIcon />
              Add New
            </Button>
          </div>
        </div>

        <div className="home__table">
          <table>
            <thead className={"home__table__header"}>
              <tr>
                {table_header.map((item, index) => (
                  <th key={index}>
                    <Tooltip title={item} arrow enterDelay={200}>
                      <span>
                        {item.split(" ").length > maxWord
                          ? item.split(" ").slice(0, maxWord).join(" ") + " ..."
                          : item}
                      </span>
                    </Tooltip>
                  </th>
                ))}

                <th></th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody className={"home__table__body"}>
              {facilityList.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="home__name__wrapper">
                      <Avatar
                        className="home__avatar"
                        alt={item.fullname}
                        src={item.avatar}
                      />
                      <p>
                        {item.fullname.slice(
                          0,
                          item.fullname
                            .toLowerCase()
                            .indexOf(filter.search.trim().toLowerCase())
                        )}
                        <span>
                          {item.fullname.slice(
                            item.fullname
                              .toLowerCase()
                              .indexOf(filter.search.trim().toLowerCase()),
                            item.fullname
                              .toLowerCase()
                              .indexOf(filter.search.trim().toLowerCase()) +
                              filter.search.trim().length
                          )}
                        </span>
                        {item.fullname.slice(
                          item.fullname
                            .toLowerCase()
                            .indexOf(filter.search.trim().toLowerCase()) +
                            filter.search.trim().length
                        )}
                      </p>
                    </div>
                  </td>
                  <td>
                    {item.address + ", " + item.town + ", " + item.district}
                  </td>
                  <td>{item.phone_number}</td>
                  <td>
                    {item.business_type.map((value, idx) => (
                      <div key={idx}>
                        <div
                          className={
                            value[0] == "S"
                              ? "home__business__type1"
                              : "home__business__type2"
                          }
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>{item.certification_number}</td>
                  <td>
                    <Button className="home__edit">
                      <ModeEditRoundedIcon />
                    </Button>
                  </td>
                  {/* <td>
                  <Button className="home__print">
                    <PrintRoundedIcon />
                  </Button>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          className="home__pagination"
          count={pagination.totalPage}
          color="secondary"
          onChange={handlePagination}
          page={pagination.currentPage}
        />
      </div>
    </div>
  );
}

export default Home;
