import React, { useState, useEffect, useRef } from "react";
import certification from "../data/certification";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Tooltip from "@mui/material/Tooltip";
import Filter from "../components/Filter";
import dayjs from "dayjs";
import "./Detail.css";

const maxWord = 3;
const rowPerPage = 10;
const table_header = [
  "Số cấp Giấy chứng nhận",
  "Ngày cấp",
  "Ngày hết hạn",
  "Vệ sinh môi trường",
  "Dụng cụ chế biến",
  "Nguồn nước",
  "Nguyên liệu sản suất",
  "Bảo quản thực phẩm",
  "Xử lý chất thải",
  "Kiến thức an toàn thực phẩm",
  "Quá trình chế biến",
];

function Detail() {
  const [openFilter, setOpenFilter] = useState(true);

  const [filterType, setFilterType] = useState("and");

  const [criteria, setCriteria] = useState({
    environment: undefined,
    appliances: undefined,
    waterSource: undefined,
    ingredient: undefined,
    foodPreservation: undefined,
    wasteTreatment: undefined,
    owners: undefined,
    preprocessing: undefined,
  });

  const [certificationList, setCertificationList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 0,
  });
  const [filter, setFilter] = useState({
    page: 1,
    limit: rowPerPage,
    search: "",
    criteriaFilter: {
      environment: undefined,
      appliances: undefined,
      waterSource: undefined,
      ingredient: undefined,
      foodPreservation: undefined,
      wasteTreatment: undefined,
      owners: undefined,
      preprocessing: undefined,
    },
    filterType: "and",
  });

  const typingTimeout = useRef(null);

  useEffect(() => {
    console.log(filter);
    var { page, limit, search, criteriaFilter, filterType } = filter;
    search = search.trim().toLowerCase();

    var tmpList;
    if (search == "") {
      tmpList = certification;
    } else {
      tmpList = [
        ...certification.filter(
          (item) => item.certification_number.toLowerCase().indexOf(search) == 0
        ),
        ...certification.filter(
          (item) => item.certification_number.toLowerCase().indexOf(search) > 0
        ),
      ];
    }

    var checkFilter = false;
    for (var key in criteriaFilter) {
      if (criteriaFilter[key] != undefined) {
        checkFilter = true;
        break;
      }
    }
    if (checkFilter) {
      if (filterType == "and") {
        tmpList = tmpList.filter(
          (item) =>
            ((item.environment == criteriaFilter.environment &&
              criteriaFilter.environment != undefined) ||
              criteriaFilter.environment == undefined) &&
            ((item.appliances == criteriaFilter.appliances &&
              criteriaFilter.appliances != undefined) ||
              criteriaFilter.appliances == undefined) &&
            ((item.water_source == criteriaFilter.waterSource &&
              criteriaFilter.waterSource != undefined) ||
              criteriaFilter.waterSource == undefined) &&
            ((item.ingredient == criteriaFilter.ingredient &&
              criteriaFilter.ingredient != undefined) ||
              criteriaFilter.ingredient == undefined) &&
            ((item.food_preservation == criteriaFilter.foodPreservation &&
              criteriaFilter.foodPreservation != undefined) ||
              criteriaFilter.foodPreservation == undefined) &&
            ((item.waste_treatment == criteriaFilter.wasteTreatment &&
              criteriaFilter.wasteTreatment != undefined) ||
              criteriaFilter.wasteTreatment == undefined) &&
            ((item.owners == criteriaFilter.owners &&
              criteriaFilter.owners != undefined) ||
              criteriaFilter.owners == undefined) &&
            ((item.preprocessing == criteriaFilter.preprocessing &&
              criteriaFilter.preprocessing != undefined) ||
              criteriaFilter.preprocessing == undefined)
        );
      } else {
        tmpList = tmpList.filter(
          (item) =>
            (item.environment == criteriaFilter.environment &&
              criteriaFilter.environment != undefined) ||
            (item.appliances == criteriaFilter.appliances &&
              criteriaFilter.appliances != undefined) ||
            (item.water_source == criteriaFilter.waterSource &&
              criteriaFilter.waterSource != undefined) ||
            (item.ingredient == criteriaFilter.ingredient &&
              criteriaFilter.ingredient != undefined) ||
            (item.food_preservation == criteriaFilter.foodPreservation &&
              criteriaFilter.foodPreservation != undefined) ||
            (item.waste_treatment == criteriaFilter.wasteTreatment &&
              criteriaFilter.wasteTreatment != undefined) ||
            (item.owners == criteriaFilter.owners &&
              criteriaFilter.owners != undefined) ||
            (item.preprocessing == criteriaFilter.preprocessing &&
              criteriaFilter.preprocessing != undefined)
        );
      }
    }

    setCertificationList(tmpList.slice((page - 1) * limit, page * limit));
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

  const handlePagination = (e, num) => {
    setFilter((filter) => {
      return { ...filter, page: num };
    });
  };

  const handleOpenFilter = () => {
    if (openFilter) {
      setCriteria({
        environment: undefined,
        appliances: undefined,
        waterSource: undefined,
        ingredient: undefined,
        foodPreservation: undefined,
        wasteTreatment: undefined,
        owners: undefined,
        preprocessing: undefined,
      });
      setFilter((filter) => {
        return {
          ...filter,
          criteriaFilter: {
            environment: undefined,
            appliances: undefined,
            waterSource: undefined,
            ingredient: undefined,
            foodPreservation: undefined,
            wasteTreatment: undefined,
            owners: undefined,
            preprocessing: undefined,
          },
          filterType: "and",
        };
      });
      setFilterType("and");
    }
    setOpenFilter((openFilter) => !openFilter);
  };

  const changeCriteriaFilter = (value, criterion) => {
    var tmp = criteria;
    tmp[criterion] = value;
    setCriteria(tmp);
  };

  const handleSubmitFilter = () => {
    var tmpCriteria = JSON.parse(JSON.stringify(criteria));
    var tmpFilterType = JSON.parse(JSON.stringify(filterType));
    setFilter((filter) => {
      return {
        ...filter,
        criteriaFilter: tmpCriteria,
        filterType: tmpFilterType,
      };
    });
  };

  const handleChangeFilterType = () =>
    setFilterType((filterType) => {
      if (filterType == "and") {
        return "or";
      } else {
        return "and";
      }
    });

  const handleClearFilter = () => {
    setCriteria({
      environment: undefined,
      appliances: undefined,
      waterSource: undefined,
      ingredient: undefined,
      foodPreservation: undefined,
      wasteTreatment: undefined,
      owners: undefined,
      preprocessing: undefined,
    });
  };

  return (
    <div className="detail">
      <div
        className={`detail__filter__table ${
          openFilter ? "detail__filter__table--active" : ""
        }`}
      >
        <div className="detail__filter__table__header">
          <h2>Filter</h2>
          <div>
            <Button
              className="detail__change__filter__type"
              onClick={handleChangeFilterType}
            >
              <AutorenewRoundedIcon />
            </Button>
            <Button
              className="detail__clear__filter"
              onClick={handleClearFilter}
            >
              <ClearRoundedIcon />
            </Button>
          </div>
        </div>
        <div>
          <Filter
            title={table_header[3]}
            choices={["Không đảm bảo", "Đảm bảo"]}
            onChange={changeCriteriaFilter}
            criteria={criteria}
            filter={"environment"}
          />

          <div className="detail__filter__type__text">
            <h6>--- {filterType} ---</h6>
          </div>

          <Filter
            title={table_header[4]}
            choices={["Không đảm bảo", "Đảm bảo"]}
            onChange={changeCriteriaFilter}
            criteria={criteria}
            filter={"appliances"}
          />

          <div className="detail__filter__type__text">
            <h6>--- {filterType} ---</h6>
          </div>

          <Filter
            title={table_header[5]}
            choices={["Không đảm bảo", "Đảm bảo"]}
            onChange={changeCriteriaFilter}
            criteria={criteria}
            filter={"waterSource"}
          />

          <div className="detail__filter__type__text">
            <h6>--- {filterType} ---</h6>
          </div>

          <Filter
            title={table_header[6]}
            choices={["Không đảm bảo", "Đảm bảo"]}
            onChange={changeCriteriaFilter}
            criteria={criteria}
            filter={"ingredient"}
          />

          <div className="detail__filter__type__text">
            <h6>--- {filterType} ---</h6>
          </div>

          <Filter
            title={table_header[7]}
            choices={["Không đảm bảo", "Đảm bảo"]}
            onChange={changeCriteriaFilter}
            criteria={criteria}
            filter={"foodPreservation"}
          />

          <div className="detail__filter__type__text">
            <h6>--- {filterType} ---</h6>
          </div>

          <Filter
            title={table_header[8]}
            choices={["Không đảm bảo", "Đảm bảo"]}
            onChange={changeCriteriaFilter}
            criteria={criteria}
            filter={"wasteTreatment"}
          />

          <div className="detail__filter__type__text">
            <h6>--- {filterType} ---</h6>
          </div>

          <Filter
            title={table_header[9]}
            choices={["Không đảm bảo", "Đảm bảo"]}
            onChange={changeCriteriaFilter}
            criteria={criteria}
            filter={"owners"}
          />

          <div className="detail__filter__type__text">
            <h6>--- {filterType} ---</h6>
          </div>

          <Filter
            title={table_header[10]}
            choices={["Không đảm bảo", "Đảm bảo"]}
            onChange={changeCriteriaFilter}
            criteria={criteria}
            filter={""}
          />

          <div className={"detail__submit__filter__wrapper"}>
            <Button
              className="detail__submit__filter"
              onClick={handleSubmitFilter}
            >
              <CheckCircleRoundedIcon />
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`detail__content ${
          openFilter ? "detail__content--collapse" : ""
        }`}
      >
        <div className="detail__header">
          <div>
            <h2>Certification</h2>
          </div>

          <div className="detail__widget">
            <div className="detail__widget--left">
              <div className="detail__search">
                <SearchRoundedIcon />
                <input
                  type="text"
                  className="detail__search__input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={handleSearch}
                />
              </div>
              <Button className="detail__filter" onClick={handleOpenFilter}>
                <FilterListRoundedIcon />
                Filter
              </Button>
            </div>
            <Button className="detail__add">
              <AddBusinessRoundedIcon />
              Add New
            </Button>
          </div>
        </div>

        <div className="detail__table">
          <table>
            <thead className={"detail__table__header"}>
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
                <th></th>
              </tr>
            </thead>
            <tbody className={"detail__table__body"}>
              {certificationList.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="detail__number__wrapper">
                      <Avatar
                        className="detail__avatar"
                        alt={item.certification_number}
                        src={item.avatar}
                      />
                      <p>
                        {item.certification_number.slice(
                          0,
                          item.certification_number
                            .toLowerCase()
                            .indexOf(filter.search.trim().toLowerCase())
                        )}
                        <span>
                          {item.certification_number.slice(
                            item.certification_number
                              .toLowerCase()
                              .indexOf(filter.search.trim().toLowerCase()),
                            item.certification_number
                              .toLowerCase()
                              .indexOf(filter.search.trim().toLowerCase()) +
                              filter.search.trim().length
                          )}
                        </span>
                        {item.certification_number.slice(
                          item.certification_number
                            .toLowerCase()
                            .indexOf(filter.search.trim().toLowerCase()) +
                            filter.search.trim().length
                        )}
                      </p>
                    </div>
                  </td>
                  <td>
                    {dayjs(item.MFG, "YYYY-MM-DDTHH:mm:ss").format(
                      "DD/MM, YYYY"
                    )}
                  </td>
                  <td>
                    {dayjs(item.expiration_date, "YYYY-MM-DDTHH:mm:ss").format(
                      "DD/MM, YYYY"
                    )}
                  </td>
                  <td>{item.environment ? "Đảm bảo" : "Không đảm bảo"}</td>
                  <td>{item.appliances ? "Đảm bảo" : "Không đảm bảo"}</td>
                  <td>{item.water_source ? "Đảm bảo" : "Không đảm bảo"}</td>
                  <td>{item.ingredient ? "Đảm bảo" : "Không đảm bảo"}</td>
                  <td>
                    {item.food_preservation ? "Đảm bảo" : "Không đảm bảo"}
                  </td>
                  <td>{item.waste_treatment ? "Đảm bảo" : "Không đảm bảo"}</td>
                  <td>{item.owners ? "Đảm bảo" : "Không đảm bảo"}</td>
                  <td>{item.processing ? "Đảm bảo" : "Không đảm bảo"}</td>

                  <td>
                    <Button className="detail__edit">
                      <ModeEditRoundedIcon />
                    </Button>
                  </td>
                  <td>
                    <Button className="detail__print">
                      <PrintRoundedIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          className="detail__pagination"
          count={pagination.totalPage}
          color="secondary"
          onChange={handlePagination}
          page={pagination.currentPage}
        />
      </div>
    </div>
  );
}

export default Detail;
