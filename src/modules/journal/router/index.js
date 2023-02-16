

export default {
  name: 'journal',
  component: () => import(/* webpackChunkName: "JournalLayout" */ '@/modules/journal/layouts/JournalLayout'),
  children: [
    {
      path: '',
      name: 'no-entry',
      component: () => import(/* webpackChunkName: "NoEntrySelected" */ '../views/NoEntrySelected'),
    },
    {
      path: ':id',
      name: 'entry',
      component: () => import(/* webpackChunkName: 'EntryView'*/'../views/EntryView')
    }
  ]
}