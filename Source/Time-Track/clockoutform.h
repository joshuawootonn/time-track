#ifndef CLOCKOUTFORM_H
#define CLOCKOUTFORM_H

#include <QDialog>
#include <QStackedWidget>
#include <QComboBox>
#include <QtSql>
#include <windows.h>
#include <QVariant>
#include <QWidget>
#include <QDesktopWidget>
#include <QCoreApplication>
#include <QStyle>
#include <QDesktopWidget>

namespace Ui {
class ClockoutForm;
}

class ClockoutForm : public QDialog
{
    Q_OBJECT

public:
    explicit ClockoutForm(QWidget *parent = 0);
    ~ClockoutForm();
    void ClockoutInitialize(QString i);

    void ProjectInitialize();
    void ItemInitialize();
    void TimesInitialize();
    void TimeLeft();

private slots:    
    void on_Projects_currentIndexChanged(const QString &arg);
    void on_Add_clicked();
    void on_Delete_clicked();
    void on_Sections_cellClicked(int row, int column);
    void on_Sections_cellChanged();
    void on_Lunch_currentTextChanged(const QString &arg1);
    void on_Description_textChanged();

    void on_FinishedButton_clicked();
    void on_CancelButton_clicked();



signals:
    void finished();

private:
    Ui::ClockoutForm *ui;
    QSqlDatabase data;
    QString id;
    bool clicked;
    int selectedRow;
    QString totalTime;
    QDateTime format_datetimes(QDateTime z);
};

#endif // CLOCKOUTFORM_H
