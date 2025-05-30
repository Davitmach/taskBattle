'use client'
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ExactChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Очищаем SVG перед созданием графика
    d3.select(svgRef.current).selectAll('*').remove();

    // Данные из изображения
    const data = [14, 16, 18, 20, 22, 24, 26, 28, 30, 2, 4, 6, 8, 10, 14, 15, 18];
    const yTicks = [5, 10, 15, 20, 25, 30, 35];

    // Размеры SVG (подобраны в соответствии с изображением)
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Создаем SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'white')
      .style('border', '1px solid #ccc');

    // Область графика
    const chartGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Шкала X (категориальная)
    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i.toString()))
      .range([0, chartWidth])
      .padding(0.1);

    // Шкала Y (линейная)
    const yScale = d3.scaleLinear()
      .domain([0, 35])
      .range([chartHeight, 0]);

    // Оси
    const xAxis = d3.axisBottom(xScale)
      .tickValues([]); // Скрываем метки оси X как на изображении

    const yAxis = d3.axisLeft(yScale)
      .tickValues(yTicks)
      .tickSize(-chartWidth) // Добавляем линии сетки
      .tickFormat(d => d === 35 ? '' : d.toString()); // Скрываем 35 как на изображении

    // Добавляем оси
    chartGroup.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);

    const yAxisGroup = chartGroup.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // Стилизация осей
    yAxisGroup.select('.domain').attr('stroke', '#000');
    yAxisGroup.selectAll('.tick line').attr('stroke', '#ccc').attr('stroke-dasharray', '2,2');
    yAxisGroup.selectAll('.tick text').attr('fill', '#000').attr('font-size', '12px');

    // Линия графика
    const line = d3.line<number>()
      .x((d, i) => xScale(i.toString())! + xScale.bandwidth() / 2)
      .y(d => yScale(d))
      .curve(d3.curveLinear);

    chartGroup.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Точки данных
    chartGroup.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => xScale(i.toString())! + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d))
      .attr('r', 3)
      .attr('fill', 'steelblue');
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ExactChart;