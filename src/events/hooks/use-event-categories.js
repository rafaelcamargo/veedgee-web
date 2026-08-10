import { lazy } from 'react';
import { useTranslation } from '@compilorama/polang';
import translations from './use-event-categories.t.js';

const SportsIcon = lazy(() => import('@src/base/icons/ball'));
const FamilyIcon = lazy(() => import('@src/base/icons/balloon'));
const ExhibitionsIcon = lazy(() => import('@src/base/icons/brush'));
const NightlifeIcon = lazy(() => import('@src/base/icons/cocktail'));
const MoviesIcon = lazy(() => import('@src/base/icons/film'));
const FestivalsIcon = lazy(() => import('@src/base/icons/flag'));
const FoodIcon = lazy(() => import('@src/base/icons/fork'));
const TheaterIcon = lazy(() => import('@src/base/icons/masks'));
const ComedyIcon = lazy(() => import('@src/base/icons/mic'));
const EducationIcon = lazy(() => import('@src/base/icons/mortarboard'));
const MusicalsIcon = lazy(() => import('@src/base/icons/musical'));
const MusicIcon = lazy(() => import('@src/base/icons/note'));
const DanceIcon = lazy(() => import('@src/base/icons/shoe'));
const BusinessIcon = lazy(() => import('@src/base/icons/suitcase'));
const FairIcon = lazy(() => import('@src/base/icons/tent'));

export const useEventCategories = () => {
  const { t } = useTranslation(translations);
  const categoryIds = Object.keys(translations['en-US']);

  return {
    getCategoryName: category => t(category),
    getCategories: () => sortCategoriesByName(
      categoryIds.map(id => ({
        id,
        name: t(id)
      }))
    ),
    getCategoryIcon,
  };
};

function getCategoryIcon(category){
  return buildCategoryIcons()[category];
}

function sortCategoriesByName(categories){
  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

function buildCategoryIcons(){
  return {
    sports: SportsIcon,
    family: FamilyIcon,
    exhibitions: ExhibitionsIcon,
    nightlife: NightlifeIcon,
    movies: MoviesIcon,
    festivals: FestivalsIcon,
    food: FoodIcon,
    theater: TheaterIcon,
    comedy: ComedyIcon,
    education: EducationIcon,
    musicals: MusicalsIcon,
    music: MusicIcon,
    dance: DanceIcon,
    business: BusinessIcon,
    fair: FairIcon,
  };
}
