#ifndef PROJECTEDITFORM_H
#define PROJECTEDITFORM_H

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
#include <QStringList>
#include <QDesktopWidget>
#include <QTimeEdit>
#include <QList>
#include <QFormLayout>
namespace Ui {
class ProjectEditForm;
}

class ProjectEditForm : public QDialog
{
    Q_OBJECT

public:
    explicit ProjectEditForm(QWidget *parent = 0);
    ~ProjectEditForm();
    bool eventFilter(QObject* object,QEvent* event);
    void ItemInitialize();
    void DimensionInitialize();
    void DefaultItemInitialize();
    void DateInitialize();
    void SectionInitialize();
    void updateProjectEdit();

    void AddProject();
    QString AddValid();
    void EditProject(QString x);
    QString EditValid();

    QString getSuccessMsg() const;

    bool getSuccess() const;

signals:
    void finished();

private slots:
    void on_AddItem_clicked();
    void on_DeleteItem_clicked();
    void on_Sections_cellClicked(int row, int column);

    void on_FinishButton_clicked();

    void on_CancelButton_clicked();

    void on_EditItem_clicked();

private:
    Ui::ProjectEditForm *ui;
    int selectedRow;
    bool clicked;
    QSqlDatabase data;
    bool success;
    QString successMsg;
    QString task;
    QString id;
};

#endif // PROJECTEDITFORM_H
