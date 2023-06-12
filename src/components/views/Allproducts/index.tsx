"use client";

import BASE_PATH_FORAPI from "@/components/shared/BasePath";
import { oneProductType } from "@/components/utils/ProductDataTypes";
import { Component } from "react";
import CardAll from "../CardsAll";
import InfiniteScroll from "react-infinite-scroll-component";

interface PropsData {
  sliceData: Array<oneProductType>;
}

export default class AllproductsData extends Component<{
  ProductData: PropsData;
}> {
  start: number = 10;
  end: number = 20;
  state: { items: Array<oneProductType>; hasMore: boolean } = {
    items: [...this.props.ProductData.sliceData],
    hasMore: true,
  };
  api_data = async (start: number, end: number) => {
    const res = await fetch(
      `${BASE_PATH_FORAPI}/api/products?start=${start}&end=${end}`
    );

    const dataToCheck = await res.json();

    if (dataToCheck.sliceData === "Not Found") {
      this.setState({
        hasMore: false,
      });
    }
    return dataToCheck;
  };

  getData = async () => {
    const Alldata = await this.api_data(this.start, this.end);
    if (Alldata.sliceData !== "Not Found") {
      this.setState({
        items: this.state.items.concat(Alldata.sliceData),
      });
    } else {
      this.setState({
        hasMore: false,
      });
    }

    this.start = this.start + 10;
    this.end = this.end + 10;
  };
  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.getData}
        hasMore={this.state.hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="content-center justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-col-4 py-10  gap-4"
      >
        {this.state.items.map((item: oneProductType, index: number) => (
          <CardAll key={index} singleProductData={item} />
        ))}
      </InfiniteScroll>
    );
  }
}
