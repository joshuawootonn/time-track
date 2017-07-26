/********************************************************************************
** Form generated from reading UI file 'projecteditform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_PROJECTEDITFORM_H
#define UI_PROJECTEDITFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDateTimeEdit>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QSpinBox>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ProjectEditForm
{
public:
    QGridLayout *gridLayout;
    QWidget *bigwidger;
    QVBoxLayout *verticalLayout;
    QHBoxLayout *horizontalLayout_5;
    QWidget *verticalWidget_2;
    QVBoxLayout *left;
    QHBoxLayout *horizontalLayout;
    QLabel *label;
    QLineEdit *name;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label_2;
    QDateTimeEdit *bidDate;
    QCheckBox *current;
    QHBoxLayout *horizontalLayout_6;
    QLabel *label_3;
    QComboBox *Item;
    QHBoxLayout *horizontalLayout_7;
    QLabel *label_4;
    QSpinBox *Quantity;
    QHBoxLayout *horizontalLayout_8;
    QLabel *label_5;
    QComboBox *Dimension;
    QHBoxLayout *horizontalLayout_9;
    QPushButton *AddItem;
    QPushButton *EditItem;
    QPushButton *DeleteItem;
    QWidget *right;
    QVBoxLayout *verticalLayout_4;
    QTableWidget *Sections;
    QWidget *horizontalWidget_4;
    QHBoxLayout *bottom;
    QLabel *error;
    QSpacerItem *horizontalSpacer;
    QPushButton *FinishButton;
    QPushButton *CancelButton;

    void setupUi(QDialog *ProjectEditForm)
    {
        if (ProjectEditForm->objectName().isEmpty())
            ProjectEditForm->setObjectName(QStringLiteral("ProjectEditForm"));
        ProjectEditForm->resize(853, 454);
        ProjectEditForm->setStyleSheet(QLatin1String("\n"
"\n"
"QDialog#ProjectEditForm{\n"
"\n"
"background-color:#E8E8E8;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 16px;\n"
"color:#263544;\n"
"}\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"QWidget#bigwidger{\n"
"background-color:#E8E8E8;\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"\n"
"QTableWidget{\n"
"border:none;\n"
"}\n"
"QTextEdit{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#D1D1D1;\n"
"}\n"
"\n"
"\n"
"\n"
"\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#D1D1D1;\n"
"	\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:"
                        "0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
"\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"\n"
"}\n"
"\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#B19994;\n"
"\n"
"}\n"
"\n"
"QLineEdit,QTimeEdit,QDateEdit,QSpinBox,QDateTimeEdit{ \n"
"background-color:#FFFFFF;\n"
" border: 0px solid #D1D1D1;	\n"
"\n"
"}\n"
"QLineEdit:hover,QTimeEdit:hover,QDateEdit:hover,QSpinBox:hover,QDateTimeEdit:hover{ \n"
"background-color:#FFFFFF;\n"
" border: 1px solid #D1D1D1;	\n"
"}\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#F4F9F6;\n"
"}\n"
"QDateEditTime::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"\n"
""));
        gridLayout = new QGridLayout(ProjectEditForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        bigwidger = new QWidget(ProjectEditForm);
        bigwidger->setObjectName(QStringLiteral("bigwidger"));
        verticalLayout = new QVBoxLayout(bigwidger);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        verticalWidget_2 = new QWidget(bigwidger);
        verticalWidget_2->setObjectName(QStringLiteral("verticalWidget_2"));
        left = new QVBoxLayout(verticalWidget_2);
        left->setObjectName(QStringLiteral("left"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        label = new QLabel(verticalWidget_2);
        label->setObjectName(QStringLiteral("label"));
        label->setMinimumSize(QSize(100, 0));
        label->setMaximumSize(QSize(100, 16777215));

        horizontalLayout->addWidget(label);

        name = new QLineEdit(verticalWidget_2);
        name->setObjectName(QStringLiteral("name"));
        name->setMinimumSize(QSize(300, 0));

        horizontalLayout->addWidget(name);


        left->addLayout(horizontalLayout);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label_2 = new QLabel(verticalWidget_2);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setMinimumSize(QSize(100, 0));
        label_2->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_2->addWidget(label_2);

        bidDate = new QDateTimeEdit(verticalWidget_2);
        bidDate->setObjectName(QStringLiteral("bidDate"));
        bidDate->setMinimumSize(QSize(225, 0));
        bidDate->setCalendarPopup(true);

        horizontalLayout_2->addWidget(bidDate);

        current = new QCheckBox(verticalWidget_2);
        current->setObjectName(QStringLiteral("current"));

        horizontalLayout_2->addWidget(current);


        left->addLayout(horizontalLayout_2);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        label_3 = new QLabel(verticalWidget_2);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setMinimumSize(QSize(100, 0));
        label_3->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_6->addWidget(label_3);

        Item = new QComboBox(verticalWidget_2);
        Item->setObjectName(QStringLiteral("Item"));
        Item->setMinimumSize(QSize(300, 0));
        Item->setEditable(true);

        horizontalLayout_6->addWidget(Item);


        left->addLayout(horizontalLayout_6);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        label_4 = new QLabel(verticalWidget_2);
        label_4->setObjectName(QStringLiteral("label_4"));
        label_4->setMinimumSize(QSize(100, 0));
        label_4->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_7->addWidget(label_4);

        Quantity = new QSpinBox(verticalWidget_2);
        Quantity->setObjectName(QStringLiteral("Quantity"));
        Quantity->setMinimumSize(QSize(300, 0));
        Quantity->setMaximum(1000000);

        horizontalLayout_7->addWidget(Quantity);


        left->addLayout(horizontalLayout_7);

        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        label_5 = new QLabel(verticalWidget_2);
        label_5->setObjectName(QStringLiteral("label_5"));
        label_5->setMinimumSize(QSize(100, 0));
        label_5->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_8->addWidget(label_5);

        Dimension = new QComboBox(verticalWidget_2);
        Dimension->setObjectName(QStringLiteral("Dimension"));
        Dimension->setMinimumSize(QSize(300, 0));
        Dimension->setEditable(false);

        horizontalLayout_8->addWidget(Dimension);


        left->addLayout(horizontalLayout_8);

        horizontalLayout_9 = new QHBoxLayout();
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        AddItem = new QPushButton(verticalWidget_2);
        AddItem->setObjectName(QStringLiteral("AddItem"));

        horizontalLayout_9->addWidget(AddItem);

        EditItem = new QPushButton(verticalWidget_2);
        EditItem->setObjectName(QStringLiteral("EditItem"));
        EditItem->setStyleSheet(QStringLiteral(""));

        horizontalLayout_9->addWidget(EditItem);

        DeleteItem = new QPushButton(verticalWidget_2);
        DeleteItem->setObjectName(QStringLiteral("DeleteItem"));

        horizontalLayout_9->addWidget(DeleteItem);


        left->addLayout(horizontalLayout_9);


        horizontalLayout_5->addWidget(verticalWidget_2);

        right = new QWidget(bigwidger);
        right->setObjectName(QStringLiteral("right"));
        verticalLayout_4 = new QVBoxLayout(right);
        verticalLayout_4->setObjectName(QStringLiteral("verticalLayout_4"));
        verticalLayout_4->setContentsMargins(9, 9, 9, 9);
        Sections = new QTableWidget(right);
        Sections->setObjectName(QStringLiteral("Sections"));

        verticalLayout_4->addWidget(Sections);


        horizontalLayout_5->addWidget(right);


        verticalLayout->addLayout(horizontalLayout_5);

        horizontalWidget_4 = new QWidget(bigwidger);
        horizontalWidget_4->setObjectName(QStringLiteral("horizontalWidget_4"));
        bottom = new QHBoxLayout(horizontalWidget_4);
        bottom->setObjectName(QStringLiteral("bottom"));
        bottom->setContentsMargins(9, 9, 9, 9);
        error = new QLabel(horizontalWidget_4);
        error->setObjectName(QStringLiteral("error"));

        bottom->addWidget(error);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        bottom->addItem(horizontalSpacer);

        FinishButton = new QPushButton(horizontalWidget_4);
        FinishButton->setObjectName(QStringLiteral("FinishButton"));
        FinishButton->setMinimumSize(QSize(100, 0));
        FinishButton->setMaximumSize(QSize(100, 16777215));

        bottom->addWidget(FinishButton);

        CancelButton = new QPushButton(horizontalWidget_4);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));
        CancelButton->setMinimumSize(QSize(100, 0));
        CancelButton->setMaximumSize(QSize(100, 16777215));

        bottom->addWidget(CancelButton);


        verticalLayout->addWidget(horizontalWidget_4);


        gridLayout->addWidget(bigwidger, 0, 0, 1, 1);

        QWidget::setTabOrder(name, bidDate);
        QWidget::setTabOrder(bidDate, current);
        QWidget::setTabOrder(current, Item);
        QWidget::setTabOrder(Item, Quantity);
        QWidget::setTabOrder(Quantity, Dimension);
        QWidget::setTabOrder(Dimension, AddItem);
        QWidget::setTabOrder(AddItem, DeleteItem);
        QWidget::setTabOrder(DeleteItem, FinishButton);
        QWidget::setTabOrder(FinishButton, CancelButton);
        QWidget::setTabOrder(CancelButton, Sections);

        retranslateUi(ProjectEditForm);

        QMetaObject::connectSlotsByName(ProjectEditForm);
    } // setupUi

    void retranslateUi(QDialog *ProjectEditForm)
    {
        ProjectEditForm->setWindowTitle(QApplication::translate("ProjectEditForm", "Project Edit", Q_NULLPTR));
        label->setText(QApplication::translate("ProjectEditForm", "Name: ", Q_NULLPTR));
        label_2->setText(QApplication::translate("ProjectEditForm", "Bid Date: ", Q_NULLPTR));
        bidDate->setDisplayFormat(QApplication::translate("ProjectEditForm", "M/d/yyyy", Q_NULLPTR));
        current->setText(QApplication::translate("ProjectEditForm", "Current", Q_NULLPTR));
        label_3->setText(QApplication::translate("ProjectEditForm", "Item: ", Q_NULLPTR));
        label_4->setText(QApplication::translate("ProjectEditForm", "Quantity:", Q_NULLPTR));
        label_5->setText(QApplication::translate("ProjectEditForm", "Dimension:", Q_NULLPTR));
        AddItem->setText(QApplication::translate("ProjectEditForm", "Add", Q_NULLPTR));
        EditItem->setText(QApplication::translate("ProjectEditForm", "Edit", Q_NULLPTR));
        DeleteItem->setText(QApplication::translate("ProjectEditForm", "Delete", Q_NULLPTR));
        error->setText(QString());
        FinishButton->setText(QApplication::translate("ProjectEditForm", "Finish", Q_NULLPTR));
        CancelButton->setText(QApplication::translate("ProjectEditForm", "Cancel", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class ProjectEditForm: public Ui_ProjectEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_PROJECTEDITFORM_H
