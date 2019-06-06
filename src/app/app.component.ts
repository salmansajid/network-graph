// import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import * as d3 from 'd3';

// interface Node {
//   id: string;
//   group: number;
// }

// interface Link {
//   source: string;
//   target: string;
//   value: number;
// }

// interface Graph {
//   nodes: Node[];
//   links: Link[];
// }

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   encapsulation: ViewEncapsulation.None
// })
// export class AppComponent implements OnInit {
//   ngOnInit() {
//     console.log('D3.js version:', d3['version']);

//     const svg = d3.select('svg');
//     const width = +svg.attr('width');
//     const height = +svg.attr('height');

//     const color = d3.scaleOrdinal(d3.schemeCategory20);

//     const simulation = d3.forceSimulation()
//       .force('link', d3.forceLink().id((d: any) => d.id))
//       .force('charge', d3.forceManyBody())
//       .force('center', d3.forceCenter(width / 2, height / 2));

//     d3.json('assets/mis.json', (err, data: any) => {
//       if (err) { throw new Error('Bad data file!'); }

//       const nodes: Node[] = [];
//       const links: Link[] = [];

//       data.nodes.forEach((d) => {
//         nodes.push(<Node>d);
//       });

//       data.links.forEach((d) => {
//         links.push(<Link>d);
//       });
//       const graph: Graph = <Graph>{ nodes, links };

//       const link = svg.append('g')
//         .attr('class', 'links')
//         .selectAll('line')
//         .data(graph.links)
//         .enter()
//         .append('line')
//         .attr('stroke-width', (d: any) => Math.sqrt(d.value));

//       const node = svg.append('g')
//         .attr('class', 'nodes')
//         .selectAll('circle')
//         .data(graph.nodes)
//         .enter()
//         .append('circle')
//         .attr('r', 5)
//         .attr('fill', (d: any) => color(d.group));


//       svg.selectAll('circle').call(d3.drag()
//         .on('start', dragstarted)
//         .on('drag', dragged)
//         .on('end', dragended)
//       );

//       node.append('title')
//         .text((d) => d.id);

//       simulation
//         .nodes(graph.nodes)
//         .on('tick', ticked);

//       simulation.force<d3.ForceLink<any, any>>('link')
//         .links(graph.links);

//       function ticked() {
//         link
//           .attr('x1', function(d: any) { return d.source.x; })
//           .attr('y1', function(d: any) { return d.source.y; })
//           .attr('x2', function(d: any) { return d.target.x; })
//           .attr('y2', function(d: any) { return d.target.y; });

//         node
//           .attr('cx', function(d: any) { return d.x; })
//           .attr('cy', function(d: any) { return d.y; });
//       }
//     });

//     function dragstarted(d) {
//       if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
//       d.fx = d.x;
//       d.fy = d.y;
//     }

//     function dragged(d) {
//       d.fx = d3.event.x;
//       d.fy = d3.event.y;
//     }

//     function dragended(d) {
//       if (!d3.event.active) { simulation.alphaTarget(0); }
//       d.fx = null;
//       d.fy = null;
//     }
//   }
// }








import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

interface Node {
  id: string;
  group: string;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface Graph {
  nodes: Node[];
  links: Link[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  public graphdb: any = {};
  public graphdata: any = {};
  public comunity = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, , 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150];
  public selectedValue = 0;

  ngOnInit() {
    this.selectedValue = 0;
    d3.json('assets/miserables.json', (err, data: any) => {
      if (err) { throw new Error('Bad data file!'); }
      this.graphdb = data;
      this.graph(0);
    });

  }

  public onChange(data) {
    this.graph(data);
  }

  public graph(data) {
    const tempDBNode = this.graphdb['nodes'].filter(x => x.community == data);
    const tempDBLink = this.graphdb['links'].filter(x => x.community == data);
    const nodes: Node[] = [];
    const links: Link[] = [];

    const curr = tempDBNode.map(x => x.id);
    const tempNode = curr.filter((x, i, a) => x && a.indexOf(x) === i);

    const graphNode = [];
    if (tempNode.length !== 0) {
      tempNode.forEach((d) => {
        const t = this.graphdb['nodes'].filter(x => x.id === d);
        graphNode.push(t[0]);
      });
    }

    graphNode.forEach((d) => {
      nodes.push(<Node>d);
    });

    tempDBLink.forEach((d) => {
      links.push(<Link>d);
    });

    this.graphdata['nodes'] = nodes;
    this.graphdata['links'] = links;

    if (d3.selectAll('svg > *')) {
      d3.selectAll('svg > *').remove();
    }


    const svg = d3.select('svg'),
      width = +svg.attr('width'),
      height = +svg.attr('height');

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const radius = d3.scaleSqrt()
      .range([0, 6]);

    const simulation = d3.forceSimulation()
      .force('link',
        d3.forceLink().id(function (d: any) { return d.id; })
          .distance(50)
          .strength(function (d) { return 0.75; })
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('collide', d3.forceCollide().radius(8))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const g = svg.append('g').attr('class', 'everything');

    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('path')
      .data(this.graphdata['links'])
      .enter().append('svg:path')
      .attr('stroke-width', function (d) { return 1 });

    link.style('fill', 'none')
      .style('stroke', 'grey')
      .style('stroke-width', '1px');

    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(this.graphdata['nodes'])
      .enter().append('g')
      .style('transform-origin', '50% 50%')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('circle')
      .attr('r', function (d: any) {
        if (d.tooltip.Frequency > 10) {
          return radius(10);
        } else { return radius(0.5); }
      })
      .attr('fill', function (d: any) { return color(d.group); });


    node.append('text')
      .attr('dy', '.5em')
      .attr('class', 'reacttext')
      .attr('text-anchor', 'middle')
      .text(function (d: any) {
        if (d.tooltip.Frequency > 10) {
          return d.id;
        } else {
          return '';
        }
      });


    const zoom_handler = d3.zoom()
      .on('zoom', zoom_actions);
    let tip;
    svg.on('click', function () {
      if (tip) { tip.remove(); }
    });

    node.on('click', function (d: any) {
      d3.event.stopPropagation();
      if (tip) { tip.remove(); }
      tip = svg.append('g')
        .attr('transform', 'translate(' + d.x + ',' + d.y + ')')
        .attr('class', 'node');

      const rect = tip.append('rect')
        .style('fill', 'white')
        .style('stroke', 'steelblue');

      const tooltip_text = Object.keys(d.tooltip);
      for (var i = 0; i < tooltip_text.length; i++) {
        const temp = tooltip_text[i];
        let tol = null;
        if (temp !== 'Title') {
          tol = roundof(d.tooltip[temp]);
        } else {
          tol = d.tooltip[temp];
        }

        tip.append('text')
          .text(temp + ' : ' + tol)
          .attr('dy', i + 1.5 +  'em')
          .attr('x', 7)
          .attr('rx', '20')
          .attr('ry', '20')
          .attr('class', 'reacttext');
      }
      const bbox = tip.node().getBBox();
      rect.attr('width', bbox.width + 20)
        .attr('height', bbox.height + 20);
    });

    simulation
      .nodes(this.graphdata['nodes'])
      .on('tick', ticked);

    simulation.force<d3.ForceLink<any, any>>('link')
      .links(this.graphdata['links']);

    function ticked() {
      link.attr('d', function (d: any) {
        const dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
        return 'M' +
          d.source.x + ',' +
          d.source.y + 'A' +
          dr + ',' + dr + ' 0 0,1 ' +
          d.target.x + ',' +
          d.target.y;
      });




      node.attr('transform', function (d: any) { return 'translate(' + d.x + ',' + d.y + ')'; });
    }

    function zoom_actions() {
      g.attr('transform', d3.event.transform);
    }

    function dragstarted(d) {
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) { simulation.alphaTarget(0) };
      d.fx = null;
      d.fy = null;
    }

    function roundof(d) {
      return Number(parseFloat(d).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2});
    }
  }








  // public graph(data) {
  //   const tempDBNode = this.graphdb['nodes'].filter(x => x.community == data);
  //   const tempDBLink = this.graphdb['links'].filter(x => x.community == data);
  //   const nodes: Node[] = [];
  //   const links: Link[] = [];

  //   const curr = tempDBNode.map(x => x.id);
  //   const tempNode = curr.filter((x, i, a) => x && a.indexOf(x) === i);

  //   const graphNode = [];
  //   if (tempNode.length !== 0) {
  //       tempNode.forEach((d) => {
  //           const t = this.graphdb['nodes'].filter(x => x.id === d);
  //           graphNode.push(t[0]);
  //       });
  //   }

  //   graphNode.forEach((d) => {
  //     nodes.push(<Node>d);
  //   });

  //   tempDBLink.forEach((d) => {
  //     links.push(<Link>d);
  //   });

  //   const graph: Graph = <Graph>{ nodes, links };

  //   if (d3.selectAll('svg > *')) {
  //     d3.selectAll('svg > *').remove();
  // }
  //   const svg = d3.select('svg');
  //   const width = +svg.attr('width');
  //   const height = +svg.attr('height');
  //   let node;
  //   let link;

  //   const simulation = d3.forceSimulation()
  //     .force('link', d3.forceLink().id(function (d: any) { return d.id; }).distance(150))
  //     .force('center', d3.forceCenter(width / 2, height / 2));

  //   update(graph.links, graph.nodes);
  //   function update(links, nodes) {
  //     link = svg.selectAll('.link')
  //       .data(links)
  //       .enter()
  //       .append('line')
  //       .attr('class', 'link');
  //     link.append('title')
  //       .text(function (d) {
  //         return d.label;
  //       });

  //     node = svg.selectAll('.node')
  //       .data(nodes)
  //       .enter()
  //       .append('g')
  //       .attr('class', 'node')
  //       .call(d3.drag()
  //         .on('start', dragstarted)
  //         .on('drag', dragged)
  //       );

  //       node.append('circle')
  //       .attr('r', 5)
  //       .attr('fill', '#'+((1<<24)*Math.random()|0).toString(16));


  //     node.append('title')
  //       .text(function (d) { return d.id; });

  //     let tip;
  //     svg.on('click', function () {
  //       if (tip) { tip.remove(); }
  //     });

  //     node.on('click', function (d: any) {
  //       d3.event.stopPropagation();
  //       if (tip) { tip.remove(); }
  //       tip = svg.append('g')
  //         .attr('transform', 'translate(' + d.x + ',' + d.y + ')')
  //         .attr('class', 'node');

  //       const rect = tip.append('rect')
  //         .style('fill', 'white')
  //         .style('stroke', 'steelblue');

  //       const tooltip_text = Object.keys(d.tooltip);
  //       for (var i = 0; i < tooltip_text.length; i++) {
  //         const temp = tooltip_text[i];
  //         tip.append('text')
  //           .text(temp + ' : ' + d.tooltip[temp])
  //           .attr('dy', i + 2 + 'em')
  //           .attr('x', 7);
  //       }
  //       const bbox = tip.node().getBBox();
  //       rect.attr('width', bbox.width + 20)
  //         .attr('height', bbox.height + 20);
  //     });

  //     simulation
  //       .nodes(nodes)
  //       .on('tick', ticked);

  //     simulation.force<d3.ForceLink<any, any>>('link')
  //       .links(graph.links);


  //   }

  //   function ticked() {
  //     link
  //       .attr('x1', function (d) { return d.source.x; })
  //       .attr('y1', function (d) { return d.source.y; })
  //       .attr('x2', function (d) { return d.target.x; })
  //       .attr('y2', function (d) { return d.target.y; });

  //     node
  //       .attr('transform', function (d) { return 'translate(' + d.x + ', ' + d.y + ')'; });
  //   }

  //   function dragstarted(d) {
  //     if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
  //     d.fx = d.x;
  //     d.fy = d.y;
  //   }

  //   function dragged(d) {
  //     d.fx = d3.event.x;
  //     d.fy = d3.event.y;

  //   }
  // }
}
