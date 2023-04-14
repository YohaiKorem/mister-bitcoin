import React, { Component } from 'react'
import { Sparklines, SparklinesBars, SparklinesLine } from 'react-sparklines'
export class Chart extends Component {
  render() {
    if (!this.props.data) return <div className="page-loading-screen "></div>
    const { values, name, description } = this.props.data
    const valuesForDisplay = values.map((value) => value.y)
    return (
      <section className="chart bottom-divider">
        <h3>{name}</h3>
        <p>{description}</p>
        <Sparklines
          data={valuesForDisplay}
          limit={6}
          width={100}
          height={30}
          margin={5}>
          <SparklinesBars color="blue" />
        </Sparklines>
      </section>
    )
  }
}
