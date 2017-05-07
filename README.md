# HO-Assignment
The demo for assignment of Ho

# Problem

### 1. Read/Write database

### 2. Find k-Nearest Neighboor algorithm

### 3. Cache history

# System architechture
To solve the problems 1 and 3, we add two components into the architect: DB controller and Cache Manager.

![alt text](https://i.gyazo.com/72fff7a6803c9deb2e0d5ff0190c7fb1.png)

The detail of Cache Manger component:
![alt text](https://i.gyazo.com/1d91a921f24b7cca662d68caa26effdd.png)

* The newest location of driver will be updated to the dictionary in cache manger.
* When passenger post the request driver, we will read the data in the cache manager (on memory), so we can reduce the I/O interaction time.

# K-Nearest neighboor algorithm
There are many algorithm to solve this issue such as: bruce force, kd-tree, region-based, ...  <br />
In gruber system, I suggestion use the Voronoi algorithm.  <br />
(link: https://en.wikipedia.org/wiki/Voronoi_diagram)


# Demo
Link demo:
http://nhan.trantientin.com


