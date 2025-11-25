import React from 'react';
import StatCard from './StatCard';

export default {
  title: 'Components/StatCard',
  component: StatCard,
};

export const Default = (args) => <StatCard {...args} />;
Default.args = {
  title: 'Possession',
  value: '65%'
};

export const Small = (args) => <StatCard {...args} />;
Small.args = {
  title: 'Avg. Score',
  value: '7.2'
};
